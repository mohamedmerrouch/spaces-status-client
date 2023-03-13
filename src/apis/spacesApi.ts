
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
            await axios.post("/spaces", {name, sector, responsible});
        console.log(response.data);
        return response.data as Space;
    } catch (error) {
        console.log('error happened', error);
        return undefined;
    }
}

export async function deleteSpace(space: Space) {
    try {
        const response =
            await axios.delete(`/spaces/${space.id}`);
        console.log(response.data);
    } catch (error) {
        console.log('error happened', error);
    }
}

export async function updateSpace(spaceToUpdate: Space, newSpaceData: Space) {
    try {
        const response =
            await axios.put(`/spaces/${spaceToUpdate.id}`, newSpaceData);
        console.log(response.data);
    } catch (error) {
        console.log('error happened', error);
    }
}
export async function getSpaces() : Promise<Array<Space> | undefined> {
    try {
        const response =
            await axios.get("/spaces");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('error happened', error);
        return undefined;
    }
}

export async function getMySpaces(responsible: string) : Promise<Array<Space> | undefined> {
    try {
        const response =
            await axios.get(`/spaces/${responsible}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('error happened', error);
        return undefined;
    }
}