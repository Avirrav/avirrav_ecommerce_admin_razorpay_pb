'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Category, Color, Image, Product, Size } from '@prisma/client';
import { Trash, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';

import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import { AlertModal } from '@/components/modals/alert-modal';
import ImageUpload from '@/components/ui/image-upload';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectEmpty,
} from '@/components/ui/select';
import { ProductDimensions } from '@/components/product-dimensions';

interface Tax {
  name: string;
  value: number;
}

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  costPerItem: z.coerce.number().min(0),
  profitMargin: z.coerce.number().min(0),
  price: z.coerce.number().min(0),
  sku: z.string().min(1),
  stockQuantity: z.coerce.number().min(0),
  sellWhenOutOfStock: z.boolean().default(false),
  requiresShipping: z.boolean().default(true),
  weight: z.coerce.number().optional(),
  weightUnit: z.string().optional(),
  length: z.coerce.number().optional(),
  width: z.coerce.number().optional(),
  height: z.coerce.number().optional(),
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizeId: z.string().min(1),
  isFeatured: z.boolean().default(false),
  isArchived: z.boolean().default(false),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData:
    | (Product & {
        images: Image[];
        costPerItem?: number;
        profitMargin?: number;
        weight?: number;
        length?: number;
        width?: number;
        height?: number;
      })
    | null;
  categories: Category[];
  sizes: Size[];
  colors: Color[];
}

export const ProductForm = ({
  initialData,
  categories,
  sizes,
  colors,
}: ProductFormProps) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [taxes, setTaxes] = useState<Tax[]>(
    initialData?.taxes ? JSON.parse(initialData.taxes) : []
  );
  const [newTaxName, setNewTaxName] = useState('');
  const [newTaxValue, setNewTaxValue] = useState('');

  const title = initialData ? 'Edit product' : 'Create product';
  const description = initialData ? 'Edit a product' : 'Add a new product';
  const toastMessage = initialData ? 'Product Updated.' : 'Product Created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          price: parseFloat(String(initialData?.price)),
          costPerItem: parseFloat(String(initialData?.costPerItem)),
          profitMargin: parseFloat(String(initialData?.profitMargin)),
          weight: initialData?.weight ? parseFloat(String(initialData.weight)) : undefined,
          length: initialData?.length ? parseFloat(String(initialData.length)) : undefined,
          width: initialData?.width ? parseFloat(String(initialData.width)) : undefined,
          height: initialData?.height ? parseFloat(String(initialData.height)) : undefined,
          weightUnit: initialData?.weightUnit || undefined,
        }
      : {
          name: '',
          description: '',
          images: [],
          price: 0,
          costPerItem: 0,
          profitMargin: 0,
          sku: '',
          stockQuantity: 0,
          sellWhenOutOfStock: false,
          requiresShipping: true,
          weight: undefined,
          weightUnit: 'kg',
          length: undefined,
          width: undefined,
          height: undefined,
          categoryId: '',
          colorId: '',
          sizeId: '',
          isFeatured: false,
          isArchived: false,
        },
  });

  const addTax = () => {
    if (newTaxName && newTaxValue) {
      const newTax = {
        name: newTaxName,
        value: parseFloat(newTaxValue),
      };
      setTaxes([...taxes, newTax]);
      setNewTaxName('');
      setNewTaxValue('');
    }
  };

  const removeTax = (index: number) => {
    const newTaxes = taxes.filter((_, i) => i !== index);
    setTaxes(newTaxes);
  };

  const costPerItem = form.watch('costPerItem');
  const profitMargin = form.watch('profitMargin');

  useEffect(() => {
    const basePrice = Number(costPerItem) * (1 + Number(profitMargin) / 100);
    const totalTax = taxes.reduce((acc, tax) => {
      return acc + (basePrice * tax.value) / 100;
    }, 0);

    const totalPrice = Number((basePrice + totalTax).toFixed(2));
    form.setValue('price', totalPrice);
  }, [costPerItem, profitMargin, taxes, form]);

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/products/${params.productId}`,
          {
            ...data,
            taxes: JSON.stringify(taxes)
          }
        );
      } else {
        await axios.post(`/api/${params.storeId}/products`, {
          ...data,
          taxes: JSON.stringify(taxes)
        });
      }
      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      
      const response = await axios.get(`/api/${params.storeId}/products/${params.productId}/check-orders`);
      const { hasOrders } = response.data;

      if (hasOrders) {
        toast.error('Cannot delete product with existing orders. Instead Archive the Product to hide it.');
        return;
      }

      await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast.success('Product deleted.');
    } catch (error: any) {
      if (error.response?.status === 400) {
        toast.error('Make sure you removed all orders using this product first.');
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className='flex items-center justify-between'>
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant='destructive'
            size='sm'
            onClick={() => setOpen(true)}
          >
            <Trash className='h-4 w-4' />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'
        >
          <div className='space-y-6'>
            <FormField
              control={form.control}
              name='images'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Images<span className='text-black'>*</span></FormLabel>
                  <FormDescription>
                    Upload high-quality images that showcase your product. Add multiple images to show different angles and details.
                  </FormDescription>
                  <FormControl>
                    <ImageUpload
                      value={field.value.map((image) => image.url)}
                      disabled={loading}
                      onChange={(url) => field.onChange([...field.value, { url }])}
                      onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name<span className='text-black'>*</span></FormLabel>
                  <FormDescription>
                    Enter a clear and descriptive name for your product that customers will easily understand.
                  </FormDescription>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Product name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description<span className='text-black'>*</span></FormLabel>
                  <FormDescription>
                    Provide a detailed description of your product including key features and benefits.
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder='Product description'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='sku'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU<span className='text-black'>*</span></FormLabel>
                  <FormDescription>
                    Enter a unique Stock Keeping Unit (SKU) code for inventory tracking.
                  </FormDescription>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='SKU'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='costPerItem'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost Per Item<span className='text-black'>*</span></FormLabel>
                  <FormDescription>
                    Enter the cost to acquire or produce one unit of this product.
                  </FormDescription>
                  <FormControl>
                    <Input
                      type='number'
                      disabled={loading}
                      placeholder='9.99'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='profitMargin'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profit Margin (%)<span className='text-black'>*</span></FormLabel>
                  <FormDescription>
                    Set your desired profit margin as a percentage above the cost.
                  </FormDescription>
                  <FormControl>
                    <Input
                      type='number'
                      disabled={loading}
                      placeholder='20'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Custom Taxes</FormLabel>
              <FormDescription>
                Add any applicable taxes or additional charges as a percentage.
              </FormDescription>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Tax name"
                    value={newTaxName}
                    onChange={(e) => setNewTaxName(e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Tax value (%)"
                    value={newTaxValue}
                    onChange={(e) => setNewTaxValue(e.target.value)}
                  />
                  <Button
                    type="button"
                    onClick={addTax}
                    variant="secondary"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {taxes.map((tax, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="flex-1">
                      {tax.name}: {tax.value}%
                    </div>
                    <Button
                      type="button"
                      onClick={() => removeTax(index)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Price</FormLabel>
                  <FormDescription>
                    Final selling price calculated from cost, margin, and taxes.
                  </FormDescription>
                  <FormControl>
                    <Input
                      type='number'
                      disabled={true}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='stockQuantity'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Quantity<span className='text-black'>*</span></FormLabel>
                  <FormDescription>
                    Enter the current available quantity in stock.
                  </FormDescription>
                  <FormControl>
                    <Input
                      type='number'
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='categoryId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category<span className='text-black'>*</span></FormLabel>
                  <FormDescription>
                    Select the category that best fits this product for better organization.
                  </FormDescription>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder='Select a category'
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.length === 0 ? (
                        <SelectEmpty>No categories available. Create a category first.</SelectEmpty>
                      ) : (
                        categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ProductDimensions title="Product Characteristics*">
            <FormField
              control={form.control}
              name='sizeId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size<span className='text-black'>*</span></FormLabel>
                  <FormDescription>
                    Select a size variant for this product. If needed, create new sizes in the Size section. Choose a default value if none exists.
                  </FormDescription>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder='Select a size'
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes.length === 0 ? (
                        <SelectEmpty>No sizes available. Create a size first.</SelectEmpty>
                      ) : (
                        sizes.map((size) => (
                          <SelectItem key={size.id} value={size.id}>
                            {size.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='colorId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color<span className='text-black'>*</span></FormLabel>
                  <FormDescription>
                    Select the color variant for this product. Add new colors in the Color section if needed. Choose a default value if none exists.
                  </FormDescription>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder='Select a color'
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors.length === 0 ? (
                        <SelectEmpty>No colors available. Create a color first.</SelectEmpty>
                      ) : (
                        colors.map((color) => (
                          <SelectItem key={color.id} value={color.id}>
                            {color.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            </ProductDimensions>
            <ProductDimensions title="Shipping & Dimensions*">
              <div className="space-y-6 p-4">
                <FormField
                  control={form.control}
                  name='weightUnit'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight Unit<span className='text-black'>*</span></FormLabel>
                      <FormDescription>
                        Choose the unit of measurement for the product&apos;s weight.
                      </FormDescription>
                      <Select
                        disabled={loading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="g">Grams (g)</SelectItem>
                          <SelectItem value="kg">Kilograms (kg)</SelectItem>
                          <SelectItem value="lbs">Pounds (lbs)</SelectItem>
                          <SelectItem value="oz">Ounces (oz)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='weight'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight<span className='text-black'>*</span></FormLabel>
                      <FormDescription>
                        Enter the product&apos;s weight for shipping calculations.
                      </FormDescription>
                      <FormControl>
                        <Input
                          type='number'
                          disabled={loading}
                          {...field}
                          value={field.value || ''}
                          onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='length'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Length (cm)<span className='text-black'>*</span></FormLabel>
                      <FormDescription>
                        Product length in centimeters for shipping calculations.
                      </FormDescription>
                      <FormControl>
                        <Input
                          type='number'
                          disabled={loading}
                          {...field}
                          value={field.value || ''}
                          onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='width'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Width (cm)<span className='text-black'>*</span></FormLabel>
                      <FormDescription>
                        Product width in centimeters for shipping calculations.
                      </FormDescription>
                      <FormControl>
                        <Input
                          type='number'
                          disabled={loading}
                          {...field}
                          value={field.value || ''}
                          onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='height'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (cm)<span className='text-black'>*</span></FormLabel>
                      <FormDescription>
                        Product height in centimeters for shipping calculations.
                      </FormDescription>
                      <FormControl>
                        <Input
                          type='number'
                          disabled={loading}
                          {...field}
                          value={field.value || ''}
                          onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ProductDimensions>

            <FormField
              control={form.control}
              name='isFeatured'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      Featured products will appear on the home page for better visibility.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='isArchived'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>
                      Archived products will be hidden from the store but remain in the database.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='sellWhenOutOfStock'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>Continue selling when out of stock</FormLabel>
                    <FormDescription>
                      Allow customers to place orders even when stock quantity reaches zero.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='requiresShipping'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>Requires shipping</FormLabel>
                    <FormDescription>
                      Enable if this product needs to be physically shipped to customers.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <Button disabled={loading} className='ml-auto' type='submit'>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ProductForm;