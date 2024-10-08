import axios from "axios";

const EUROPEANA_API_KEY = "uonwheavi";
const EUROPEANA_API_URL = "https://www.europeana.eu/api/v2/search.json";

export const fetchEuropeanaArtworks = (query, artist = "", category = "") => {
  return axios
    .get(EUROPEANA_API_URL, {
      params: {
        query: query,
        rows: 50, 
        start: 1,
        wskey: EUROPEANA_API_KEY
      }
    })
    //.then(response => response.data.items)
    .then(response => response.data.items.map(item => ({
      title: item.title,
      creator: item.dcCreator ? item.dcCreator.join(", ") : "Unknown",
      date: item.dcDate ? item.dcDate[0] : "Unknown",
      contributors: item.dcContributor ? item.dcContributor.join(", ") : "Unknown",
      theme: item.dcSubject ? item.dcSubject.join(", ") : "Unknown",
      workType: item.dcType ? item.dcType[0] : "Unknown",
      imageUrl: item.edmPreview ? item.edmPreview[0] : null,
      dcDescription: item.dcDescription || null
    })))
    .catch(error => {
      console.error("Error fetching Europeana artworks:", error);
      throw error;
    });
};

const HARVARD_API_KEY = "1083ce27-15d9-467e-9a08-074923497cde";
const HARVARD_API_URL = "https://api.harvardartmuseums.org/object";

export const fetchHarvardArtworks = (query, artist = "", category = "") => {
  return axios
    .get(HARVARD_API_URL, {
      params: {
        q: query,
        size: 50,
        apikey: HARVARD_API_KEY
      }
    })
    //.then(response => response.data.records)
    .then(response => response.data.records.map(record => ({
      title: record.title,
      creator: record.people ? record.people.map(p => p.name).join(", ") : "Unknown",
      date: record.dated || "Unknown",
      contributors: record.creditline || "Unknown",
      theme: record.subjects ? record.subjects.map(s => s.term).join(", ") : "Unknown",
      workType: record.classification || "Unknown",
      imageUrl: record.primaryimageurl || null,
      dcDescription: record.description || null 
    })))
    .catch(error => {
      console.error("Error fetching Harvard artworks:", error);
      throw error;
    });
};
