import { publicInstance, requestWithToken } from "@/utils/axios/axios-http"

export const getProductByVariantId = async (variantId) => {
  try {
    const response = await requestWithToken(publicInstance, {
      method: "GET",
      url: `/variants/${variantId}`,
    })
    return response.data
  } catch (error) {
    console.log(`Error fetching product by variant ID ${variantId}:`, error)
    throw new Error(`Failed to fetch product by variant ID ${variantId}`)
  }
}