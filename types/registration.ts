
export interface Registration {
  nama: string;
  email: string;
  tanggalLahir: string;
  role: "member" | "admin";
}

export function validateRequired<T extends object>(
  data: T,
  requiredFields: (keyof T)[]
): boolean {
  return requiredFields.every((key) => {
    const value = data[key];
    return String(value).trim() !== "";
  });
}

const pendaftaranFaid: Registration = {
  nama: "Faid",
  email: "faidnayara_25@kharisma.ac.id",
  tanggalLahir: "2005-08-26",
  role: "member"
};

const pendaftaranKosong: Registration = {
  nama: "",
  email: " ",
  tanggalLahir: "2005-05-10",
  role: "member"
};

const fieldWajib: (keyof Registration)[] = [
  "nama",
  "email",
  "tanggalLahir",
  "role"
];

console.log(
  "Hasil pendaftaran Faid:",
  validateRequired(pendaftaranFaid, fieldWajib)
);

console.log(
  "Hasil pendaftaran kosong:",
  validateRequired(pendaftaranKosong, fieldWajib)
);
