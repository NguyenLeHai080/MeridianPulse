"""WebSocket Connection Manager - MeridianPulse Backend
Maintains concurrent real-time subscriber connections with zero-leak teardown.
"""

from typing import Dict, List, Set
from fastapi import WebSocket


class ConnectionManager:
    def __init__(self):
        # Maps ward_id or channel to active WebSocket connections
        self.active_connections: Dict[str, Set[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, channel: str = "ICU-01"):
        await websocket.accept()
        if channel not in self.active_connections:
            self.active_connections[channel] = set()
        self.active_connections[channel].add(websocket)

    def disconnect(self, websocket: WebSocket, channel: str = "ICU-01"):
        if channel in self.active_connections:
            self.active_connections[channel].discard(websocket)
            if not self.active_connections[channel]:
                del self.active_connections[channel]

    async def broadcast(self, data: dict, channel: str = "ICU-01"):
        if channel in self.active_connections:
            disconnected_sockets = set()
            for connection in self.active_connections[channel]:
                try:
                    await connection.send_json(data)
                except Exception:
                    disconnected_sockets.add(connection)
            
            for dead_socket in disconnected_sockets:
                self.disconnect(dead_socket, channel)


ws_manager = ConnectionManager()
