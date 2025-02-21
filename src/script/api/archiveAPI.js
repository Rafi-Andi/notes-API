import { API_BASE } from "./notesAPI";
import { generateObjek } from "./notesAPI";


const getArchived = async () => {
    try {
        const ress = await fetch(`${API_BASE}/notes/archived`)
        const data = await ress.json()
        console.log(data);

        renderArchive(data.data)
    } catch(err) {
        console.log(err)
    }
}

const renderArchive = (notes) => {
    const archiveList = document.querySelector('archive-list');
    console.log(archiveList)
    console.log(archiveList)
    const archiveData = [];

    notes.forEach(archive => {
        const noteObjek = generateObjek(
            archive.id,
            archive.title,
            archive.body,
            archive.archived,
            archive.createdAt,
        )

        archiveData.unshift(noteObjek);
    });

    archiveList.setArchiveData(archiveData)
    console.log(archiveData)
}

export const unarchiveNotes = async (id) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    }

    try {
        const ress = await fetch(`${API_BASE}/notes/${id}/unarchive`, options)
    } catch(err) {
        console.log(err)
    }
}

getArchived()