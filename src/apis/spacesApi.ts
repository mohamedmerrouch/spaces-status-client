
import axios from "axios";

export interface Space {
    id: string;
    name: string;
    sector: string;
    available: boolean;
    responsible: string;
}

export async function addSpace(name: string, sector: string, responsible: string): Promise<Space | undefined> {
    try {
        const response =
            await axios.post("https://spaces-status-server.onrender.com/spaces", {name, sector, responsible});
        return response.data as Space;
    } catch (error) {
        console.log('error happened', error);
        return undefined;
    }
}

export async function deleteSpace(space: Space) {
    try {
        await axios.delete(`https://spaces-status-server.onrender.com/spaces/${space.id}`);
    } catch (error) {
        console.log('error happened', error);
    }
}

export async function updateSpace(spaceToUpdate: Space, newSpaceData: Space) {
    try {
        await axios.put(`https://spaces-status-server.onrender.com/spaces/${spaceToUpdate.id}`, newSpaceData);
    } catch (error) {
        console.log('error happened', error);
    }
}
export async function getSpaces() : Promise<Array<Space> | undefined> {
    try {
        const response =
            await axios.get("https://spaces-status-server.onrender.com/spaces");
        return response.data;
    } catch (error) {
        console.log('error happened', error);
        return undefined;
    }
}

export async function getMySpaces(responsible: string) : Promise<Array<Space> | undefined> {
    try {
        const response =
            await axios.get(`https://spaces-status-server.onrender.com/spaces/${responsible}`);
        return response.data;
    } catch (error) {
        console.log('error happened', error);
        return undefined;
    }
}