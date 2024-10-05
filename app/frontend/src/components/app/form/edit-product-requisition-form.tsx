import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  Form,
  Button
} from '@/components/ui'
import {
  addNewProductRequestSchema,
  TAddNewProductRequestSchema,
  TUpdateProductRequestSchema,
  updateProductRequestSchema
} from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { IProductRequisitionInfo } from '@/types'
import { SelectUnit } from '../select/unit-select'

interface IFormEditProductProps {
  data?: IProductRequisitionInfo
  onSubmit: (data: IProductRequisitionInfo) => void
}

export const EditProductRequisitionForm: React.FC<IFormEditProductProps> = ({ data, onSubmit }) => {
  const { t } = useTranslation('tableData')
  const isEditMode = !!data
  const isExistingProduct = data?.isExistProduct || false

  const form = useForm<TUpdateProductRequestSchema>({
    resolver: zodResolver(updateProductRequestSchema),
    defaultValues: {
      // code: data?.product.code || '',
      slug: data?.product.slug || '',
      isExistProduct: isExistingProduct,
      product: {
        code: data?.product.code || '',
        slug: data?.product.slug || '',
        name: data?.product.name || '',
        provider: data?.product.provider || '',
        unit: { name: data?.product.unit.name || '', slug: data?.product.unit.slug || '' },
        // unit: data?.product.unit || { name: '', slug: '' },
        quantity: data?.product.quantity || 1,
        description: data?.product.description
      },
      requestQuantity: data?.requestQuantity || 1
      //   description: data?.description || ''
    }
  })

  const handleSubmit = (values: TAddNewProductRequestSchema) => {
    console.log('values in form', values)
    const completeData: IProductRequisitionInfo = {
      ...values,
      requestQuantity: Number(values.requestQuantity),
      product: {
        ...values.product,
        unit: {
          name: values.product.unit.name,
          slug: values.product.unit.slug
        }
      }
    }
    onSubmit(completeData)
  }

  return (
    <div className="mt-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-3 gap-2">
            <FormField
              control={form.control}
              name="product.code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('tableData.productCode')}</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly={isExistingProduct} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="product.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('tableData.productName')}</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly={isExistingProduct} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="product.provider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('tableData.provider')}</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly={isExistingProduct} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <FormField
              control={form.control}
              name="requestQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('tableData.quantity')}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      placeholder={t('tableData.quantity')}
                      {...field}
                      value={field.value || 1}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="product.unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('tableData.unit')}</FormLabel>
                  <FormControl>
                    <SelectUnit
                      onChange={(value) =>
                        field.onChange({ name: value?.label || '', slug: value?.value || '' })
                      }
                      defaultValue={
                        data?.product.unit
                          ? { value: data.product.unit.slug, label: data.product.unit.name }
                          : undefined
                      }
                      isDisabled={isExistingProduct}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="product.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('tableData.description')}</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly={isExistingProduct} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end w-full">
            <Button type="submit">{isEditMode ? t('tableData.update') : t('tableData.add')}</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
