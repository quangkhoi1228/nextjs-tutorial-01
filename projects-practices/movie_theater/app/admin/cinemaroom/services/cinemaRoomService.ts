// services/cinemaRoomService.ts
import { BaseService } from "../../api/baseService";
import { CinemaRoom } from "../types";

const cinemaRoomService = new BaseService<CinemaRoom>('/cinema-rooms');

export default cinemaRoomService;
