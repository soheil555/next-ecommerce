import { Product, IProduct } from '@/components/product'

async function getProducts() {
  // const products = await stripe.products.list({
  //   apiKey: process.env.STRIPE_SECRET_KEY,
  // })

  const products = {
    data: [
      {
        id: 'prod_ODNNzroJpH92L7',
        object: 'product',
        active: true,
        attributes: [],
        created: 1688666985,
        default_price: 'price_1NQwcfGkFpntCCLm13A1PB3M',
        description:
          '10 PINK CORAL Mobile | Desktop Lightroom Presets for Instagram Bloggers, Peachy Photo Editing Filters. Presets are perfect for peachy, film tone pictures.',
        images: [
          'https://files.stripe.com/links/MDB8YWNjdF8xRmVkT3FHa0ZwbnRDQ0xtfGZsX3Rlc3RfUElNaU1IbzMzQ0ZHQ2g3WjdHTFpiVUI200jCI1hAVf',
        ],
        livemode: false,
        metadata: {},
        name: '10 Presets - PINK CORAL',
        package_dimensions: null,
        shippable: null,
        statement_descriptor: null,
        tax_code: null,
        type: 'service',
        unit_label: null,
        updated: 1688666986,
        url: null,
      },
      {
        id: 'prod_ODNJ70UNYAvPkQ',
        object: 'product',
        active: true,
        attributes: [],
        created: 1688666771,
        default_price: 'price_1NQwZDGkFpntCCLmJRibzzfW',
        description:
          '18 Spring Lightroom Presets | Floral Aesthetic | Easter Mobile Presets | Spring Presets | Jump Filter Instagram | Blogger Presets | Natural Lifestyle Presets | Natural Airy Spring Presets | Pastel Instagram filters',
        images: [
          'https://files.stripe.com/links/MDB8YWNjdF8xRmVkT3FHa0ZwbnRDQ0xtfGZsX3Rlc3RfNUtHblBySVZyWnJCTXdBRzRyc1owajZa00iZuxS5Fy',
        ],
        livemode: false,
        metadata: {},
        name: '18 Spring Lightroom Presets',
        package_dimensions: null,
        shippable: null,
        statement_descriptor: null,
        tax_code: null,
        type: 'service',
        unit_label: null,
        updated: 1688666772,
        url: null,
      },
      {
        id: 'prod_ODNGzjwIZhUJRI',
        object: 'product',
        active: true,
        attributes: [],
        created: 1688666540,
        default_price: 'price_1NQwVVGkFpntCCLmmLKXK6TY',
        description:
          'A Presets Lightroom Package Turquoise and perfect bluesPresets Lightroom for mobileThese presets can be used for both the free and paid version of Lightroom, the mobile phone app, and the desktop version for PC and Mac.',
        images: [
          'https://files.stripe.com/links/MDB8YWNjdF8xRmVkT3FHa0ZwbnRDQ0xtfGZsX3Rlc3RfMUJCcmU3UFdDcHBPRGhNQlFHY2lnc1RK00QlwE89zT',
        ],
        livemode: false,
        metadata: {},
        name: 'Sea Preset',
        package_dimensions: null,
        shippable: null,
        statement_descriptor: null,
        tax_code: null,
        type: 'service',
        unit_label: null,
        updated: 1688666542,
        url: null,
      },
      {
        id: 'prod_ODNCUyBehwLz8w',
        object: 'product',
        active: true,
        attributes: [],
        created: 1688666319,
        default_price: 'price_1NQwRwGkFpntCCLmKw18zd5M',
        description:
          'My presets are ideal for portraits, wedding, travel lifestyle, food blogging and interior design, perfect for creating a beautiful Instagram feed!',
        images: [
          'https://files.stripe.com/links/MDB8YWNjdF8xRmVkT3FHa0ZwbnRDQ0xtfGZsX3Rlc3RfOWR4aGR5cDZMdHlSTm1jNlIxajk2bUdz00kTqc8kIC',
        ],
        livemode: false,
        metadata: {},
        name: 'DREAMY Mom Blogger Lightroom',
        package_dimensions: null,
        shippable: null,
        statement_descriptor: null,
        tax_code: null,
        type: 'service',
        unit_label: null,
        updated: 1688667439,
        url: null,
      },
      {
        id: 'prod_ODN6jpP5r8kcE6',
        object: 'product',
        active: true,
        attributes: [],
        created: 1688665971,
        default_price: 'price_1NQwMKGkFpntCCLmV10ZHrjf',
        description:
          'Celebrate your love story with our exquisite Wedding Presets Bundle, a delicately curated collection of presets designed to make your wedding photos truly unforgettable. Transform every captured moment into a work of art with ease and elegance.',
        images: [
          'https://files.stripe.com/links/MDB8YWNjdF8xRmVkT3FHa0ZwbnRDQ0xtfGZsX3Rlc3RfcEJkWkRIZmF2ZXN2dU5ndjg5YURQWXBD00kWQl4FMa',
        ],
        livemode: false,
        metadata: {},
        name: 'Wedding Presets Bundle',
        package_dimensions: null,
        shippable: null,
        statement_descriptor: null,
        tax_code: null,
        type: 'service',
        unit_label: null,
        updated: 1688665973,
        url: null,
      },
    ],
  }

  // const prices = await stripe.prices.list({
  //   apiKey: process.env.STRIPE_SECRET_KEY,
  // })

  const prices = {
    data: [
      {
        id: 'price_1NQwcfGkFpntCCLm13A1PB3M',
        object: 'price',
        active: true,
        billing_scheme: 'per_unit',
        created: 1688666985,
        currency: 'usd',
        custom_unit_amount: null,
        livemode: false,
        lookup_key: null,
        metadata: {},
        nickname: null,
        product: 'prod_ODNNzroJpH92L7',
        recurring: null,
        tax_behavior: 'unspecified',
        tiers_mode: null,
        transform_quantity: null,
        type: 'one_time',
        unit_amount: 1000,
        unit_amount_decimal: '1000',
      },
      {
        id: 'price_1NQwZDGkFpntCCLmJRibzzfW',
        object: 'price',
        active: true,
        billing_scheme: 'per_unit',
        created: 1688666771,
        currency: 'usd',
        custom_unit_amount: null,
        livemode: false,
        lookup_key: null,
        metadata: {},
        nickname: null,
        product: 'prod_ODNJ70UNYAvPkQ',
        recurring: null,
        tax_behavior: 'unspecified',
        tiers_mode: null,
        transform_quantity: null,
        type: 'one_time',
        unit_amount: 2500,
        unit_amount_decimal: '2500',
      },
      {
        id: 'price_1NQwVVGkFpntCCLmmLKXK6TY',
        object: 'price',
        active: true,
        billing_scheme: 'per_unit',
        created: 1688666541,
        currency: 'usd',
        custom_unit_amount: null,
        livemode: false,
        lookup_key: null,
        metadata: {},
        nickname: null,
        product: 'prod_ODNGzjwIZhUJRI',
        recurring: null,
        tax_behavior: 'unspecified',
        tiers_mode: null,
        transform_quantity: null,
        type: 'one_time',
        unit_amount: 2000,
        unit_amount_decimal: '2000',
      },
      {
        id: 'price_1NQwRwGkFpntCCLmKw18zd5M',
        object: 'price',
        active: true,
        billing_scheme: 'per_unit',
        created: 1688666320,
        currency: 'usd',
        custom_unit_amount: null,
        livemode: false,
        lookup_key: null,
        metadata: {},
        nickname: null,
        product: 'prod_ODNCUyBehwLz8w',
        recurring: null,
        tax_behavior: 'unspecified',
        tiers_mode: null,
        transform_quantity: null,
        type: 'one_time',
        unit_amount: 10000,
        unit_amount_decimal: '10000',
      },
      {
        id: 'price_1NQwMKGkFpntCCLmV10ZHrjf',
        object: 'price',
        active: true,
        billing_scheme: 'per_unit',
        created: 1688665972,
        currency: 'usd',
        custom_unit_amount: null,
        livemode: false,
        lookup_key: null,
        metadata: {},
        nickname: null,
        product: 'prod_ODN6jpP5r8kcE6',
        recurring: null,
        tax_behavior: 'unspecified',
        tiers_mode: null,
        transform_quantity: null,
        type: 'one_time',
        unit_amount: 2000,
        unit_amount_decimal: '2000',
      },
    ],
  }

  const productsWithPrices: IProduct[] = products.data.map(product => {
    const unitAmount =
      prices.data.find(price => price.id === product.default_price)
        ?.unit_amount || null

    return {
      id: product.id,
      name: product.name,
      description: product.description || '',
      image: product.images[0],
      unitAmount,
    }
  })

  return productsWithPrices
}

export default async function Home() {
  const products = await getProducts()

  return (
    <div className='grid grid-cols-fluid gap-10'>
      {products.map((product, i) => (
        <Product key={i} {...product} />
      ))}
    </div>
  )
}
