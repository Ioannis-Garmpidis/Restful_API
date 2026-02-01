// Εισαγωγή helper για advanced queries
const APIFeatures = require('../utils/apiFeatures');

// Εισαγωγή του Game model
const Game = require('../models/gameModel');

// Λήψη όλων των παιχνιδιών με φίλτρα / sort / fields / pagination
exports.getAllGames = async (req, res) => {
    try {
      const features = new APIFeatures(Game.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
  
      const games = await features.query;
  
      res.status(200).json({
        status: 'success',
        results: games.length,
        data: {
          games
        }
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err.message
      });
    }
  };

// Δημιουργία νέου παιχνιδιού
exports.createGame = async (req, res) => {
  try {
    const newGame = await Game.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        game: newGame
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Λήψη των 5 καλύτερων παιχνιδιών βάσει βαθμολογίας
exports.getTop5Games = async (req, res) => {
    try {
      const games = await Game.find()
        .sort({ rating: -1 })
        .limit(5);
  
      res.status(200).json({
        status: 'success',
        results: games.length,
        data: {
          games
        }
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err.message
      });
    }
  };

// Λήψη παιχνιδιών ανά κατηγορία
exports.getGamesByCategory = async (req, res) => {
    try {
      const category = req.params.category;
  
      const games = await Game.find({ category });
  
      res.status(200).json({
        status: 'success',
        results: games.length,
        data: {
          games
        }
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err.message
      });
    }
  };

  // Διαγραφή παιχνιδιού με βάση το id
exports.deleteGame = async (req, res) => {
    try {
      await Game.findByIdAndDelete(req.params.id);
  
      res.status(204).json({
        status: 'success',
        data: null
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err.message
      });
    }
  };

  // Ενημέρωση παιχνιδιού με βάση το id
exports.updateGame = async (req, res) => {
    try {
      const updatedGame = await Game.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );
  
      res.status(200).json({
        status: 'success',
        data: {
          game: updatedGame
        }
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err.message
      });
    }
  };

  // Λήψη ενός παιχνιδιού με βάση το id
exports.getGameById = async (req, res) => {
    try {
      const game = await Game.findById(req.params.id);
  
      res.status(200).json({
        status: 'success',
        data: {
          game
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: 'Game not found'
      });
    }
  };