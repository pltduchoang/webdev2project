//firebase database reference
import { db } from '../_utils/firebase';
import { collection, getDocs, getDoc ,addDoc, deleteDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";

//get all events from firebase
export const subscribeToEvents = (onUpdate) => {
    try {
      const eventsData = collection(db, "events");
  
      return onSnapshot(eventsData, (snapshot) => {
        const eventList = snapshot.docs.map((doc) => {
          const data = doc.data();
          const event = {
            id: doc.id,
            ...data,
            createdAt: data.createdAt.toDate(),
            dateUpdated: data.dateUpdated.toDate(),
          };
          
          return event;
        });
  
        // Sort the eventList based on a criterion, for example, event date
        eventList.sort((a, b) => {
          const dateA = new Date(a.eventDate);
          const dateB = new Date(b.eventDate);
          return dateA - dateB;
        });
        console.log("Event List:", eventList);
        onUpdate(eventList);
      });
    } catch (error) {
      console.error("Error in subscribeToShoppingList:", error);
      throw error;
    }
  };
  
  //get all events from firebase
  export const getEvents = async () => {
    try {
      const eventsData = collection(db, "events");
      const eventsSnapshot = await getDocs(eventsData);
      const eventList = eventsSnapshot.docs.map((doc) => {
        const data = doc.data();
        const event = {
          id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate(),
          dateUpdated: data.dateUpdated.toDate(),
        };
        return event;
      });
  
      // Sort the eventList based on a criterion, for example, event date
      eventList.sort((a, b) => {
        const dateA = new Date(a.eventDate);
        const dateB = new Date(b.eventDate);
        return dateA - dateB;
      });
  
      return eventList;
    } catch (error) {
      console.error("Error getting event list:", error);
      throw error;
    }
  };

  //get event by id from firebase
  export const getEventById = async (id) => {
    try {
      const eventDocRef = doc(db, "events", id);
      const eventDoc = await getDoc(eventDocRef);
  
      if (eventDoc.exists()) {
        const event = eventDoc.data();
        return {
          id: eventDoc.id,
          ...event,
          createdAt: event.createdAt.toDate(),
          dateUpdated: event.dateUpdated.toDate(),
        };
      } else {
        console.log("No such event!");
      }
    } catch (error) {
      console.error("Error getting event:", error);
      throw error;
    }
  };


  //add new event to firebase
  export const addEvent = async (eventData) => {
    try {
      const eventsCollection = collection(db, 'events');

      // Add a new document to the 'events' collection with the provided eventData
      const docRef = await addDoc(eventsCollection, eventData);

      console.log('Event added with ID: ', docRef.id);
      return docRef.id; // Return the ID of the added event
    } catch (error) {
      console.error('Error adding event: ', error);
      throw error;
      }
    };

    // Update event in Firebase
    export const updateEvent = async (eventData) => {
      try {
        const eventsCollection = collection(db, 'events');
        const eventDocRef = doc(db, 'events', eventData.id); // Reference to the event document

        await updateDoc(eventDocRef, eventData); // Update the event document with the new data
        console.log('Event updated with ID: ', eventData.id);
      } catch (error) {
        console.error('Error updating event: ', error);
        throw error;
      }
    };


    // Delete event from Firebase
    export const deleteEvent = async (eventId) => {
      try {
        const eventDocRef = doc(db, 'events', eventId); // Reference to the event document
        await deleteDoc(eventDocRef); // Delete the event document
        console.log('Event deleted with ID: ', eventId);
      } catch (error) {
        console.error('Error deleting event: ', error);
        throw error;
      }
    };