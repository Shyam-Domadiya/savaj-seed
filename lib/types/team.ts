export interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: string;
  bio: string;
  imageUrl: string;
  expertise: string[];
  experience: string;
  education: string;
  email?: string;
  linkedin?: string;
}

export interface BusinessInfo {
  companyName: string;
  establishedYear: number;
  registrationNumber?: string;
  gstNumber: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  contact: {
    phone: string[];
    email: string[];
    whatsapp?: string;
  };
  businessHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    linkedin?: string;
  };
}