export default function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name required";
  } else if (!/^[a-zA-Z\s]*$/g.test(input.name))
    errors.name = "You must only wirte letters in this field";
  if (!input.minWeight || !input.maxWeight) {
    errors.minWeight = "Weight required";
    errors.maxWeight = "Weight required";
  } else {
    if (parseInt(input.minWeight) > parseInt(input.maxWeight))
      errors.minWeight = "Minimum Weight cannot exceed Maximum Weight";
  }

  if (!input.minHeight || !input.maxHeight) {
    errors.minHeight = "Height required";
    errors.maxHeight = "Height required";
  } else {
    if (parseInt(input.minHeight) > parseInt(input.maxHeight))
      errors.minHeight = "Minimum Height cannot exceed Maximum Height";
  }

  if (!input.minLifeSpan || !input.maxLifeSpan) {
    errors.minLifeSpan = "LifeSpan required";
    errors.maxLifeSpan = "LifeSpan required";
  } else {
    if (parseInt(input.minLifeSpan) > parseInt(input.maxLifeSpan))
      errors.minLifeSpan = "Minimum LifeSpan cannot exceed Maximum LifeSpan";
  }

  return errors;
}
