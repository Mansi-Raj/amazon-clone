import { Header } from '../../components/Header';
import { OrderSummary } from './OrderSummary';

export function Checkout({cartQuantity}){
  return(
    <>
      <Header cartQuantity={cartQuantity}/>
      <OrderSummary />
    </>
  )
}