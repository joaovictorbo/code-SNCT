import React, { useEffect } from "react";
import "./modal.css";
import info from "./assets/maisinfo.png";

function Modal(propos) {
  useEffect(() => {
    const openModalButton = document.querySelector(`#open-modal-${propos.posts.id}`);
    const closeModalButton = document.querySelector(`#close-modal-${propos.posts.id}`);
    const modal = document.querySelector(`#modal-${propos.posts.id}`);
    const fade = document.querySelector(`#fade-${propos.posts.id}`);

    const toggleModal = () => {
      [modal, fade].forEach((el) => el.classList.toggle("hide"));
    };

    [openModalButton, closeModalButton, fade].forEach((el) => {
      el.addEventListener("click", toggleModal);
    });

    return () => {
      [openModalButton, closeModalButton, fade].forEach((el) => {
        el.removeEventListener("click", toggleModal);
      });
    };
  }, []);

  return (
    <div className="minha-clase">
      <a href={`/pagdesc`} id={`open-modal-${propos.posts.id}`} className="saiba-mais open-modal">
        <img src={info} width={36} height={36} alt="Info" />
      </a>

      <div id={`fade-${propos.posts.id}` } className="hide "></div>
      <div id={`modal-${propos.posts.id}`} className="hide ">
        <div className="modal-header">
          <h3 style={{ color: "black", padding: "1rem" }}>{propos.posts.id}</h3>
          <button id={`close-modal-${propos.posts.id}`}>Fechar</button>
        </div>
        <div className="modal-body">
          <p style={{ color: "black", padding: "1rem" }}>
            {propos.posts.descricao}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Modal;





