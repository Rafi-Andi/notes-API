import Swal from "sweetalert2";

export const alertSuccess = (text) => {
  Swal.fire({
    title: "Berhasil",
    text: text,
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
    timerProgressBar: true,
  });
};

export const alertError = (text) => {
  Swal.fire({
    title: "Gagal",
    text: text,
    icon: "error",
    timer: 2000,
    showConfirmButton: false,
    timerProgressBar: true,
  });
};
