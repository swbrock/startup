getUserName = function() {
    return localStorage.getItem('userName') ?? 'Anonymous';
}

class Event {
    constructor(username, title, accessGroup, startDate, endDate, view) {
      this.username = username;
      this.title = title;
      this.accessGroup = accessGroup;
      this.pictures = [];
      this.videos = [];
      this.view = view;
      this.journalEntries = [];
      this.startDate = startDate;
      this.endDate = endDate;
    }
  
    addPicture(picture) {
      this.pictures.push(picture);
    }
  
    removePicture(picture) {
      const index = this.pictures.indexOf(picture);
      if (index !== -1) {
        this.pictures.splice(index, 1);
      }
    }
  
    addVideo(video) {
      this.videos.push(video);
    }
  
    removeVideo(video) {
      const index = this.videos.indexOf(video);
      if (index !== -1) {
        this.videos.splice(index, 1);
      }
    }
  
    addTextEntry(text) {
      this.textEntries.push(text);
    }
  
    removeTextEntry(text) {
      const index = this.textEntries.indexOf(text);
      if (index !== -1) {
        this.textEntries.splice(index, 1);
      }
    }
  
    setView(view) {
      this.view = view;
    }

    addAccess(person) {
        this.accessGroup.push(person);
    }
    
    removeAccess(person) {
        const index = this.accessGroup.indexOf(person);
        if (index !== -1) {
          this.accessGroup.splice(index, 1);
        }
    }
  }

  // Define some dummy event objects
let eventsPics = [
    {
      id: 1,
      name: "First Day Of Business School",
      start_date: "2022-09-05",
      end_date: "2022-09-05",
      image_url: "yourWaalPics/1631835325773.jpg"
    },
    {
      id: 2,
      name: "Eternal Families with the Cousins",
      start_date: "2022-07-10",
      end_date: "2022-07-10",
      image_url: "yourWaalPics/GIWT7462.JPG"
    },
    {
      id: 3,
      name: "Oregon Coast Waterfall",
      start_date: "2022-06-01",
      end_date: "2022-06-01",
      image_url: "yourWaalPics/IMG_0013.JPG"
    },
    {
      id: 4,
      name: "Oregon Coast Ice Cream",
      start_date: "2022-06-02",
      end_date: "2022-06-02",
      image_url: "yourWaalPics/IMG_0017.JPG"
    },
    {
      id: 5,
      name: "Ski Trip",
      start_date: "2022-01-15",
      end_date: "2022-01-15",
      image_url: "yourWaalPics/IMG_0344.JPEG"
    },
    {
      id: 6,
      name: "Workout with Samuel",
      start_date: "2022-02-20",
      end_date: "2022-02-20",
      image_url: "yourWaalPics/SLUO6054.JPG"
    },
  ];

  //add event to end of eventsPics array
    function addEvent(event) {
        eventsPics.push(event);
    }
  
  // Store the events in local storage
  localStorage.setItem("eventsPics", JSON.stringify(eventsPics));
  console.log(localStorage.getItem("eventsPics"));
  console.log(localStorage.getItem("events"));
  

  