function statusHandler(req, res) {
  res.status(200).send({ message: "Deu certo, mãe!" });
}

export default statusHandler;
