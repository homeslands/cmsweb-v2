import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { IProductRequisitionFormCreate, IProductRequisitionInfo, IRequisitionStore } from '@/types'
import { showToast, showErrorToast } from '@/utils'
import i18next from 'i18next'

export const useRequisitionStore = create<IRequisitionStore>()(
  persist(
    (set, get) => ({
      requisition: undefined,
      getRequisition: () => get().requisition,
      setRequisition: (requisition: IProductRequisitionFormCreate) => {
        set((state) => ({
          requisition: {
            ...requisition,
            requestProducts: state.requisition?.requestProducts ?? []
          }
        }))
        showToast(i18next.t('toast.requisitionSetSuccess', { ns: 'toast' }))
      },
      updateRequisition: (updatedFields: Partial<IProductRequisitionFormCreate>) => {
        set((state) => ({
          requisition: state.requisition
            ? {
                ...state.requisition,
                ...updatedFields,
                requestProducts: state.requisition.requestProducts
              }
            : undefined
        }))
      },
      clearRequisition: () => set({ requisition: undefined }),
      addProductToRequisition: (product: IProductRequisitionInfo) => {
        const currentRequisition = get().requisition

        if (currentRequisition) {
          const productSlug = product.product.slug

          // If no slug, add new product to requisition
          if (!productSlug) {
            set({
              requisition: {
                ...currentRequisition,
                requestProducts: [...currentRequisition.requestProducts, { ...product }]
              }
            })
            showToast(i18next.t('toast.addNewProductSuccess', { ns: 'toast' }))
            return
          }

          // If slug exists, check if product already exists in requisition
          const productExists = currentRequisition.requestProducts.some(
            (p) => p.product.slug === productSlug
          )

          if (productExists) {
            showErrorToast(1000)
          } else {
            set({
              requisition: {
                ...currentRequisition,
                requestProducts: [...currentRequisition.requestProducts, { ...product }]
              }
            })
            showToast(i18next.t('toast.addNewProductSuccess', { ns: 'toast' }))
          }
        }
      },

      updateProductToRequisition: (product: IProductRequisitionInfo) => {
        const currentRequisition = get().requisition
        if (currentRequisition) {
          const productIndex = currentRequisition.requestProducts.findIndex(
            (p) => p.product.slug === product.product.slug
          )
          if (productIndex === -1) {
            showErrorToast(1000)
          } else {
            const updatedProducts = [...currentRequisition.requestProducts]
            updatedProducts[productIndex] = product
            set({ requisition: { ...currentRequisition, requestProducts: updatedProducts } })
            showToast('Đã cập nhật vật tư trong phiếu yêu cầu!')
          }
        }
      },
      deleteProductToRequisition: (product: IProductRequisitionInfo) => {
        const currentRequisition = get().requisition
        if (currentRequisition) {
          const updatedProducts = currentRequisition.requestProducts.filter(
            (p) => p.product.slug !== product.product.slug
          )
          set({ requisition: { ...currentRequisition, requestProducts: updatedProducts } })
          showToast('Đã xóa vật tư trong phiếu yêu cầu!')
        }
      }
    }),
    {
      name: 'requisition-storage'
    }
  )
)
