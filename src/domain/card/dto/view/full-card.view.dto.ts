export class FullCardViewDto {
  intolerances: string;
  height: number;
  weight: number;
  blood_type: string;
  first_name: string;
  last_name: string;
  birthday: string;
  resolution_data: ResolutionData[];
}

export class ResolutionData {
  first_name: string;
  last_name: string;
  date: string;
  complaints: string;
  diagnosis: string;
  purpose: string;
}
