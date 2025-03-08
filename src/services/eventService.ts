import type { Event, PageEvent } from "../models/event";
import * as repo from "../repository/eventRepositoryPrisma";

export function getEventByCategory(category: string) {
  return repo.getEventByCategory(category);
}

export function getAllEvents() {
  return repo.getAllEventsWithOrganizer();
}

export async function getAllEventsWithPagination(keyword: string, pageSize: number, pageNo: number): Promise<PageEvent>{
  const events = await repo.getAllEventsWithOrganizerPagination(keyword,pageSize, pageNo);  
  return events;
}

export function getEventById(id: number) {
  return repo.getEventById(id);
}

export function count(){
  return repo.countEvent();
}
export function addEvent(newEvent: Event) {
  return repo.addEvent(newEvent);
}


