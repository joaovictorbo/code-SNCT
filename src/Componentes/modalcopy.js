import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import axios from "axios";
import info from "./assets/maisinfo.png";
const dataurl = "http://192.168.15.56:8000/Turma/";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function NestedModal(propos) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const votar = async (id)=>{
    const response =await axios.patch(dataurl+'Votar/'+id+'/');
  }
  return (
    <div>
      
      <Button onClick={handleOpen}> <img src={info} width={36} height={36} alt="Info" /></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
        <div className="minha-clase">
  

          <div id={`${propos.posts.id}`} >
            <div className="modal-header">
              <h3 style={{ color: "black", padding: "1rem" }}>{propos.posts.titulo}</h3>
            </div>
            <div className="modal-body">
              <p style={{ color: "black", padding: "1rem" }}>
                {propos.posts.descricao}
              </p>
            </div>
          </div>
        </div>
          <Button onClick={handleClose}>Fechar</Button>
          <Button onClick={()=>{votar(propos.posts.id)}}>Votar</Button>
        </Box>
      </Modal>
    </div>
  );
}