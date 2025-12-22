//get selected option of delivery date
export  function getSelectedDeliveryOption(deliveryOptionId){
  let selectedOption;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
        selectedOption = option;
    }
  });
  return selectedOption;
}

export const deliveryOptions = [{
    id: '1',
    days: 7,
    priceCents: 0
},{
    id: '2',
    days: 3,
    priceCents: 499
},
{
    id: '3',
    days: 1,
    priceCents: 999
}];