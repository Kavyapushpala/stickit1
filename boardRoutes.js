const express = require("express");
const Board = require("../models/Board");
const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { userId, title, passkey } = req.body;
    const newBoard = new Board({ userId, title, passkey });
    await newBoard.save();
    res.status(201).json({ message: "Board created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error creating board", error });
  }
});

router.post("/access", async (req, res) => {
  try {
    const { title, passkey } = req.body;
    const board = await Board.findOne({ title, passkey });
    if (!board) return res.status(400).json({ message: "Invalid passkey" });

    res.status(200).json({ message: "Access granted", boardId: board._id });
  } catch (error) {
    res.status(500).json({ message: "Error accessing board", error });
  }
});

module.exports = router;