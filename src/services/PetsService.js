let pets = [
  {
    id: 1,
    name: 'Pipo',
    imageUri: 'https://t2.ea.ltmcdn.com/es/images/6/9/3/enfermedades_mas_comunes_en_perros_caniches_23396_600_square.jpg',
    breed: 'Caniche',
    weight: '2',
    birthday: "12-12-2015",
    sex: 'MALE',
    vaccines: [],
    treatment: null,
  },
];

const getPets = () => {
  return pets;
};

const addPet = (pet) => {
  const id = pets.length + 1;
  const newPet = {...pet, id}
  pets.push(newPet);
}

const addTreatmentToPet = (id, treatment) => {
  let pet = pets.find(p => p.id === id);
  pet.treatment = treatment;
}

const addNewVaccioneToPet = (id, vaccine) => {
  if (!vaccine) return;
  let pet = pets.find(p => p.id === id);
  pet.vaccines.push(vaccine);
}

export { getPets, addPet, addTreatmentToPet, addNewVaccioneToPet }