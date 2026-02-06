import { Router } from "express";
import { requireAuth } from "../utils/middleware.ts";
import { createRoom, getRoom, getUserRooms } from "../queries/rooms.ts";
import type { RoomCreate } from "../utils/types.ts";

// Create router for route group
const router = Router();

// Use auth middleware
router.use(requireAuth);

/**
 * Get a summary of all rooms available to the currently logged-in user.
 */
router.get("/", async (req, res) => {
  // Get user from request
  const user = req.authUser;

  // Check if user is authenticated
  if (user) {
    // Get all rooms for user
    const rooms = await getUserRooms(user.id);

    // Return success
    res.status(200).json({ rooms });
  } else {
    res.sendStatus(401);
  }
});

/**
 * Create a new room.
 */
router.post("/", async (req, res) => {
  // Get user from request
  const user = req.authUser;

  // Check if user is authenticated
  if (user) {
    // Get request body
    const body = req.body as RoomCreate;

    // If description not provided, default to no description
    if (body.description === undefined) {
      body.description = null;
    }

    // Check for length issues
    if (body.name.length > 20 || body.name.length < 3) {
      return res.status(422).json({
        code: 422,
        message: "Room name must be between 3 and 20 characters.",
      });
    }

    if (body.description && body.description.length > 150) {
      return res.status(422).json({
        code: 422,
        message: "Room description cannot exceed 150 characters.",
      });
    }

    // Create room
    const room = await createRoom(user.id, body.name, body.description);

    // Return success
    res.status(201).json(room);
  } else {
    res.sendStatus(401);
  }
});

/**
 * Get information on a specific room
 */
router.get("/:roomId", async (req, res) => {
  // Get room ID
  const roomId = BigInt(req.params.roomId);

  // Get room
  const room = await getRoom(roomId);

  // Check if room exists
  if (room) {
    res.status(200).json(room);
  } else {
    res
      .status(404)
      .json({ code: 404, message: "Room with given ID not found." });
  }
});

// Export router as default export.
export default router;
