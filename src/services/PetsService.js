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
    treatment: 'Dont have a treatment'
  },
];

const getPets = () => {
  return pets;
};

const addPet = (pet) => {
  const id = pets.length + 1;
  const newPet = {...pet, id}
  pets.push(newPet);
  console.log(pets);
}

export { getPets, addPet }