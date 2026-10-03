import { supabase } from "@/lib/supabase";

export type CartLine = {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

export async function placeOrder(params: {
  items: CartLine[];
  total: number;
  address: string;
  paymentMethod: string;
  note: string;
}): Promise<number> {
  const items = params.items.map((i) => {
    const foodId = Number(i.id);
    const price = Math.round(Number(i.price));
    if (!Number.isInteger(foodId)) {
      throw new Error(`Item "${i.name}" has a non-numeric id (${i.id}).`);
    }
    return {
      food_id: foodId,
      name: i.name,
      price,
      quantity: i.quantity,
      image: i.image ?? null,
    };
  });

  const { data, error } = await supabase.rpc("place_order", {
    p_total: Math.round(params.total),
    p_address: params.address,
    p_payment_method: params.paymentMethod,
    p_note: params.note,
    p_items: items,
  });

  if (error) throw error;
  return data as number; // the new order id
}

// Edge Functions return a generic message on errors; this extracts the real one
export async function functionError(error: any): Promise<string> {
  try {
    const body = await error.context.json();
    return body.error ?? error.message;
  } catch {
    return error?.message ?? "Something went wrong";
  }
}
