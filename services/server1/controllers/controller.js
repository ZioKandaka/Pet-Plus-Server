const { User, Pet } = require("../models/index");
const bcrypt = require("bcrypt");
const { createToken } = require("../middlewares/jwt");
const { Op } = require("sequelize");
const ImageCloud = require("../helpers/imageKit");

class Controller {
  // users controller (zio)
  static async register(req, res, next) {
    try {
      // console.log(req.body, "<><><><><>");

      let { username, fullName, email, password, phoneNumber, address, role } =
        req.body;
      // console.log(req.body, "INI BODY")
      // console.log(req.file, "INI FILE")
      // let role = "client";
      // password = bcrypt.hashSync(password, 10);
      // console.log(password, "PWD")
      let imgUrl = null;
      if (req.file) {
        let link = await ImageCloud(req.file);
        imgUrl = link.url;
      }

      let newUser = await User.create({
        username,
        fullName,
        email,
        password,
        imgUrl,
        role,
        phoneNumber,
        address,
      });

      res.status(201).json({ message: "Account created" });
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  static async login(req, res, next) {
    console.log("MASUK")
    try {
      console.log(req.body, "OKOKOK");
      let { email, password } = req.body;
      if (!email) {
        throw { name: "emailRequired" };
      }
      if (!password) {
        throw { name: "passwordRequired" };
      }

      const user = await User.findOne({
        where: { email: email }
      });
      if (!user) {
        // console.log('error di email')
        throw { name: "InvalidCredential" };
      }
      console.log(user);
      if (await bcrypt.compare(password, user.password)) {
        const access_token = createToken({ UserId: user.id, email: email });
        // console.log('masuk', '<<<<<<<<<<<<')
        res.status(200).json({
          access_token: access_token,
          UserId: user.id,
          role: user.role,
          username: user.username,
        });
      } else {
        throw { name: "InvalidCredential" };
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async putUser(req, res, next) {
    try {
      let { UserId } = req.params;
      let { username, fullName, email, password, phoneNumber, address } =
        req.body;

      let exist = await User.findByPk(UserId);
      if (!exist) {
        throw { name: "notFound" };
      }
      // password = bcrypt.hashSync(password, 10);

      let imgUrl = null;
      if (req.file) {
        let link = await ImageCloud(req.file);
        imgUrl = link.url;
      }

      let newUser = await User.update(
        {
          username,
          fullName,
          email,
          password,
          imgUrl,
          phoneNumber,
          address,
        },
        {
          where: { id: UserId },
        }
      );
      res.status(201).json({ message: "Your account has been updated" });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getUserById(req, res, next) {
    try {
      // let UserId = req.user.UserId;
      let { UserId } = req.params;
      let user = await User.findByPk(UserId);
      if (!user) {
        throw { name: "notFound" };
      }
      user.password = "unknown";
      // console.log(user)
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  // pet controller (devira)
  static async addPet(req, res, next) {
    try {
      let imgUrl = null
      if (req.file) {
        let link = await ImageCloud(req.file);
        let imgUrl = link.url;
      }


    
      // console.log(imgUrl, ">>>>>>>>>>>>>>>>>>>>>>>");

      const pet = await Pet.create({
        name: req.body.name,
        imgUrl,
        gender: req.body.gender,
        description: req.body.description,
        species: req.body.species,
        breed: req.body.breed,
        weight: req.body.weight,
        UserId: req.params.UserId,
      });
      res.status(201).json(pet);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async fetchAllPet(req, res, next) {
    try {
      // console.log(req.params);

      let user = await User.findByPk(req.params.UserId)
      if (!user) {
        throw { name: "notFound" };
      }
      

      const pet = await Pet.findAll({
        where: {
          UserId: req.params.UserId,
        },
      });
      res.status(200).json(pet);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async fetchPet(req, res, next) {
    try {
      const pet = await Pet.findOne({
        where: {
          id: req.params.id,
        },
        include: User,
      });
      if (!pet) {
        throw { name: "notFound" };
      }
      res.status(200).json(pet);
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  static async putPet(req, res, next) {
    try {
      let imgUrl = req.body.imgUrl;
      if (req.file) {
        let link = await ImageCloud(req.file);
        // console.log(link, "<><>");
        let imgUrl = link.url;
      }

      const pet = await Pet.findByPk(req.params.id)
      if (!pet) {
        throw { name: "notFound" };
      }

      const updatedPet = await Pet.update(
        {
          name: req.body.name,
          imgUrl,
          gender: req.body.gender,
          description: req.body.description,
          species: req.body.species,
          breed: req.body.breed,
          weight: req.body.weight,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      res.status(200).json({ message: "Succesfully Edit Profil for Your Pet" });
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  static async deletePet(req, res, next) {
    try {
      const pet = await Pet.findByPk(req.params.id);
      if (!pet) {
        throw { name: "notFound" };
      }

      await Pet.destroy({
        where: {
          id: req.params.id,
        },
      });

      res.status(200).json({ message: `success to delete` });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = Controller;
