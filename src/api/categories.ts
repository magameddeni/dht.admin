import { ICategory } from "@/interface"
import { useQuery } from "@tanstack/react-query"
import { $api } from "./axios"

export const useGetCategories = () => {
  return useQuery({
    queryFn: async (): Promise<{
      categories: ICategory[]
      allCategories: ICategory[]
    } | null> => {
      const { data: response, status } = await $api.get<ICategory[]>(
        "/category",
      )
      if (status !== 200) return null
      const mainCategories = response?.filter(({ nesting }) => nesting === 0)

      const searchRecursiveSubCategories = (categoryId: number): any => {
        const subCategories = response?.filter(
          ({ parent_id }) => parent_id === categoryId,
        )
        return subCategories?.map((category) => ({
          ...category,
          sub: searchRecursiveSubCategories(category.id),
        }))
      }

      const categories = mainCategories.map((category: ICategory) => ({
        ...category,
        sub: searchRecursiveSubCategories(category.id),
      }))

      return { categories, allCategories: response }
    },

    queryKey: ["categories", "all"],
  })
}
