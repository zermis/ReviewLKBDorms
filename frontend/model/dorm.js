class Dorm {
    constructor(data) {
      this.id = data.id;
      this.nameEng = data.name_eng;
      this.nameTh = data.name_th;
      this.locationEng = data.location_eng;
      this.locationTh = data.location_th;
      this.gender = data.gender;
      this.details = data.details;
      this.phoneNum = data.phone_num;
      this.gpsLatitude = data.gps_latitude;
      this.gpsLongitude = data.gps_longitude;
      this.createdTime = new Date(data.created_time);
      this.avgRating = data.avg_rating;
      this.imageUrl = data.image_url;
      this.priceMin = data.price_min;
      this.priceMax = data.price_max;
    }
  
    // You can add methods here to format or process the data
    getFullAddress() {
      return `${this.locationEng}, ${this.locationTh}`;
    }
  
    getFormattedDate() {
      return this.createdTime.toLocaleDateString();
    }
  }

export { Dorm };