import "./App.css";
import { TextField, MenuItem, Button } from "@mui/material";
import { useState, useEffect } from "react";
import logo from "../src/assets/logo.png";
function Form() {
  const initialState = {
    professorName: "",
    location: "", // Local
    room: "", // Sala
    problem: "", // Problema
  };

  const [formData, setFormData] = useState(initialState);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  // Atualização na função de formatação da mensagem do WhatsApp
  const formatWhatsAppMessage = () => {
    return (
      `Olá, gostaria de solicitar um serviço do DTI.\n\n` +
      `Nome do Professor: ${formData.professorName}\n` +
      `Local: ${formData.location}\n` +
      `Sala: ${formData.room}\n` +
      `Problema: ${formData.problem}`
    );
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault();
    const message = formatWhatsAppMessage();
    const whatsappNumber = "88993751008"; // Número atualizado
    const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, "_blank");
    setFormData(initialState); // Limpar os estados após o envio
  };

  // Função para lidar com a mudança nos campos do formulário
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const checkIfFormIsValid = () => {
      return (
        formData.professorName &&
        formData.location &&
        formData.room &&
        formData.problem
      );
    };

    setIsSubmitDisabled(!checkIfFormIsValid());
  }, [formData]);

  return (
    <div className="container">
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <h1>SOLITAÇÃO DTI</h1>
      </div>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome do Professor"
            name="professorName"
            value={formData.professorName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            select
            label="Local"
            name="location"
            value={formData.location}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="Prédio Principal">Prédio Principal</MenuItem>
            <MenuItem value="Clínica Escola">Clínica Escola</MenuItem>
            <MenuItem value="Anexo">Anexo</MenuItem>
          </TextField>
          <TextField
            label="Sala"
            name="room"
            value={formData.room}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Demanda"
            name="problem"
            value={formData.problem}
            onChange={handleChange}
            fullWidth
            multiline
            margin="normal"
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={{ marginTop: "20px", fontSize: "1.5em", color: "#fff" }}
            disabled={isSubmitDisabled}
          >
            Enviar Solicitação
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Form;
