export interface Notification {
  id: string;
  icon: string;
  title: string;
  message: string;
}

export interface GenericData {
  name: string;
  shortName: string;
  bipUrl: string;
  nip: string;
  regon: string;
  krs: string;
}

export interface AddressData {
  street: string;
  zipCode: string;
  town: string;
}

export interface ContactData {
  id: string;
  name: string;
  phone: string;
  email: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  roleType: string;
  photoUrl?: string;
  phone?: string;
  email?: string;
}

export interface Department {
  id: string;
  name: string;
  domain?: string;
  location?: string;
  phone?: string;
  email?: string;
  staff?: Array<StaffMember>
}
