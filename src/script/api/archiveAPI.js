import { API_BASE } from "./notesAPI";
import { generateObjek } from "./notesAPI";
import { showLoading, hideLoading, sleep } from "../utils/loading";
import { alertError, alertSuccess } from "../utils/alertStatus";

const loading = document.querySelector(".loading");

const getArchived = async () => {
  showLoading(loading);

  try {
    const ress = await fetch(`${API_BASE}/notes/archived`);

    await sleep();

    const data = await ress.json();
    console.log(data);

    renderArchive(data.data);
  } catch (err) {
    console.log(err);
  } finally {
    hideLoading(loading);
  }
};

const renderArchive = (notes) => {
  const archiveList = document.querySelector("archive-list");
  console.log(archiveList);
  console.log(archiveList);
  const archiveData = [];

  notes.forEach((archive) => {
    const noteObjek = generateObjek(
      archive.id,
      archive.title,
      archive.body,
      archive.archived,
      archive.createdAt,
    );

    archiveData.unshift(noteObjek);
  });

  archiveList.setArchiveData(archiveData);
  console.log(archiveData);
};

export const unarchiveNotes = async (id) => {
  showLoading(loading);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const ress = await fetch(`${API_BASE}/notes/${id}/unarchive`, options);

    await sleep();

    const data = await ress.json();
    getArchived();

    alertSuccess("Catatan berhasil di kembalikan");
  } catch (err) {
    alertError("Catatan gagal di kembalikan");
  } finally {
    hideLoading(loading);
  }
};

getArchived();
