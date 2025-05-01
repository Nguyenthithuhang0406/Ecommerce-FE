export const orderData = [
    {
      id: 'ORD-10001',
      orderDate: '2024-04-10T09:30:00',
      sellerName: 'ElectroTech Store',
      storeName: 'ElectroTech Official',
      sellerContact: '+1 (234) 567-8901',
      status: 'Delivered',
      shippingMethod: 'Standard Delivery',
      shippingFee: '$5.99',
      estimatedDelivery: 'Apr 14, 2024',
      recipient: 'John Doe',
      recipientPhone: '+1 (234) 567-8901',
      deliveryAddress: '123 Main St, Apt 4B, New York, NY 10001',
      paymentMethod: 'Credit Card',
      paymentStatus: 'Paid',
      subtotal: '$294.97',
      discount: '$15.00',
      tax: '$28.00',
      totalAmount: '$313.96',
      items: [
        {
          id: 'ITEM-001',
          name: 'Wireless Headphones',
          price: '$129.99',
          quantity: 1,
          size: 'One Size',
          subtotal: '$129.99',
          image: 'https://www.energysistem.com/cdnassets/products/45305/principal_2000.jpg',
          description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.'
        },
        {
          id: 'ITEM-002',
          name: 'Smartphone Case',
          price: '$24.99',
          quantity: 2,
          size: 'iPhone 13 Pro',
          subtotal: '$49.98',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa57qA6_AHmiYl1D7XdLxKGTWKdh1QRAf7Xg&s',
          description: 'Durable protective case with shock-absorbing corners and slim profile.'
        },
        {
          id: 'ITEM-003',
          name: 'USB-C Fast Charger',
          price: '$39.99',
          quantity: 1,
          size: 'N/A',
          subtotal: '$39.99',
          image: 'https://img.lazcdn.com/g/p/0c32c3633f2ed1fa9307df3e37a31a00.jpg_360x360q75.jpg_.webp',
          description: '65W fast charger compatible with most laptops and smartphones.'
        },
        {
          id: 'ITEM-004',
          name: 'Wireless Mouse',
          price: '$49.99',
          quantity: 1,
          size: 'N/A',
          subtotal: '$49.99',
          image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/c/h/chuot-khong-day-logitech-mx-master-2s_3_.png',
          description: 'Ergonomic wireless mouse with customizable buttons and long battery life.'
        },
        {
          id: 'ITEM-005',
          name: 'HDMI Cable',
          price: '$12.99',
          quantity: 2,
          size: '6ft',
          subtotal: '$25.98',
          image: 'https://img.lazcdn.com/g/p/8236ce9d619eabf0b411279242e6e4f9.jpg_360x360q75.jpg_.webp',
          description: 'High-speed HDMI cable for 4K video and audio transmission.'
        }
      ]
    },
    {
      id: 'ORD-10002',
      orderDate: '2024-04-15T14:45:00',
      sellerName: 'Fashion Trends',
      status: 'Shipping',
      shippingFee: 'Free',
      totalAmount: '$159.97',
      items: [
        {
          id: 'ITEM-101',
          name: 'Slim Fit Jeans',
          price: '$59.99',
          quantity: 1,
          size: '32',
          subtotal: '$59.99',
          image: 'https://shop.mango.com/assets/rcs/pics/static/T5/fotos/S/57040687_TL.jpg?imwidth=2048&imdensity=1&ts=1682336015748',
          description: 'Classic blue slim fit jeans with slight stretch for comfort.'
        },
        {
          id: 'ITEM-102',
          name: 'Cotton T-Shirt',
          price: '$24.99',
          quantity: 2,
          size: 'M',
          subtotal: '$49.98',
          image: 'https://azaudio.vn/wp-content/uploads/2024/11/hydro-flask-mug-gift-set-limited-2024-2.jpg',
          description: 'Premium cotton t-shirt in solid color, perfect for everyday wear.'
        },
        {
          id: 'ITEM-103',
          name: 'Leather Belt',
          price: '$49.99',
          quantity: 1,
          size: '34',
          subtotal: '$49.99',
          image: 'https://azaudio.vn/wp-content/uploads/2024/11/hydro-flask-mug-gift-set-limited-2024-2.jpg',
          description: 'Genuine leather belt with classic metal buckle.'
        }
      ]
    },
    {
      id: 'ORD-10003',
      orderDate: '2024-04-18T11:20:00',
      sellerName: 'Home Essentials',
      status: 'Pending',
      shippingFee: '$8.99',
      totalAmount: '$108.98',
      items: [
        {
          id: 'ITEM-201',
          name: 'Ceramic Mug Set',
          price: '$29.99',
          quantity: 1,
          size: 'Set of 4',
          subtotal: '$29.99',
          image: 'https://azaudio.vn/wp-content/uploads/2024/11/hydro-flask-mug-gift-set-limited-2024-2.jpg',
          description: 'Set of 4 ceramic mugs in assorted colors, microwave and dishwasher safe.'
        },
        {
          id: 'ITEM-202',
          name: 'Kitchen Towels',
          price: '$14.99',
          quantity: 1,
          size: 'Pack of 3',
          subtotal: '$14.99',
          image: 'https://azaudio.vn/wp-content/uploads/2024/11/hydro-flask-mug-gift-set-limited-2024-2.jpg',
          description: 'Absorbent cotton kitchen towels in classic striped pattern.'
        },
        {
          id: 'ITEM-203',
          name: 'Stainless Steel Water Bottle',
          price: '$27.99',
          quantity: 2,
          size: '20oz',
          subtotal: '$55.98',
          image: 'https://azaudio.vn/wp-content/uploads/2024/11/hydro-flask-mug-gift-set-limited-2024-2.jpg',
          description: 'Double-walled insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.'
        }
      ]
    },
    {
      id: 'ORD-10004',
      orderDate: '2024-04-05T16:10:00',
      sellerName: 'Sports Outlet',
      status: 'Delivered',
      shippingFee: '$7.50',
      totalAmount: '$177.49',
      items: [
        {
          id: 'ITEM-301',
          name: 'Running Shoes',
          price: '$89.99',
          quantity: 1,
          size: '10',
          subtotal: '$89.99',
          image: 'https://azaudio.vn/wp-content/uploads/2024/11/hydro-flask-mug-gift-set-limited-2024-2.jpg',
          description: 'Lightweight running shoes with responsive cushioning and breathable mesh upper.'
        },
        {
          id: 'ITEM-302',
          name: 'Athletic Socks',
          price: '$12.99',
          quantity: 2,
          size: 'Medium',
          subtotal: '$25.98',
          image: 'https://azaudio.vn/wp-content/uploads/2024/11/hydro-flask-mug-gift-set-limited-2024-2.jpg',
          description: 'Moisture-wicking athletic socks with arch support, pack of 6 pairs.'
        },
        {
          id: 'ITEM-303',
          name: 'Sport Water Bottle',
          price: '$18.99',
          quantity: 1,
          size: '32oz',
          subtotal: '$18.99',
          image: 'https://azaudio.vn/wp-content/uploads/2024/11/hydro-flask-mug-gift-set-limited-2024-2.jpg',
          description: 'BPA-free sports water bottle with flip-top lid and measurement markings.'
        },
        {
          id: 'ITEM-304',
          name: 'Fitness Tracker',
          price: '$42.99',
          quantity: 1,
          size: 'One Size',
          subtotal: '$42.99',
          image: 'https://azaudio.vn/wp-content/uploads/2024/11/hydro-flask-mug-gift-set-limited-2024-2.jpg',
          description: 'Waterproof fitness tracker with heart rate monitoring and sleep tracking.'
        }
      ]
    },
    {
      id: 'ORD-10005',
      orderDate: '2024-04-12T10:05:00',
      sellerName: 'Book Corner',
      status: 'Cancelled',
      shippingFee: 'Free',
      totalAmount: '$47.96',
      items: [
        {
          id: 'ITEM-401',
          name: 'Bestselling Novel',
          price: '$15.99',
          quantity: 2,
          size: 'Paperback',
          subtotal: '$31.98',
          image: 'https://azaudio.vn/wp-content/uploads/2024/11/hydro-flask-mug-gift-set-limited-2024-2.jpg',
          description: 'The latest bestselling fiction novel from award-winning author.'
        },
        {
          id: 'ITEM-402',
          name: 'Bookmark Set',
          price: '$7.99',
          quantity: 1,
          size: 'Set of 5',
          subtotal: '$7.99',
          image: 'https://azaudio.vn/wp-content/uploads/2024/11/hydro-flask-mug-gift-set-limited-2024-2.jpg',
          description: 'Colorful magnetic bookmarks that wont fall out of your books.'
        },
        {
          id: 'ITEM-403',
          name: 'Reading Light',
          price: '$7.99',
          quantity: 1,
          size: 'Clip-on',
          subtotal: '$7.99',
          image: 'https://azaudio.vn/wp-content/uploads/2024/11/hydro-flask-mug-gift-set-limited-2024-2.jpg',
          description: 'Rechargeable LED reading light with adjustable brightness levels.'
        }
      ]
    },
    {
      id: 'ORD-10006',
      orderDate: '2024-04-16T09:15:00',
      sellerName: 'Kitchen Gadgets',
      status: 'Processing',
      shippingFee: '$6.99',
      totalAmount: '$86.97',
      items: [
        {
          id: 'ITEM-501',
          name: 'Coffee Grinder',
          price: '$39.99',
          quantity: 1,
          size: 'N/A',
          subtotal: '$39.99',
          image: 'https://azaudio.vn/wp-content/uploads/2024/11/hydro-flask-mug-gift-set-limited-2024-2.jpg',
          description: 'Electric coffee grinder with multiple grind settings for perfect coffee every time.'
        },
        {
          id: 'ITEM-502',
          name: 'Silicone Spatula Set',
          price: '$14.99',
          quantity: 1,
          size: 'Set of 3',
          subtotal: '$14.99',
          image: 'https://azaudio.vn/wp-content/uploads/2024/11/hydro-flask-mug-gift-set-limited-2024-2.jpg',
          description: 'Heat-resistant silicone spatulas in three sizes, dishwasher safe.'
        },
        {
          id: 'ITEM-503',
          name: 'Digital Kitchen Scale',
          price: '$19.99',
          quantity: 1,
          size: 'N/A',
          subtotal: '$19.99',
          image: 'https://azaudio.vn/wp-content/uploads/2024/11/hydro-flask-mug-gift-set-limited-2024-2.jpg',
          description: 'Precise digital kitchen scale with tare function and multiple unit options.'
        },
        {
          id: 'ITEM-504',
          name: 'Measuring Cups',
          price: '$11.99',
          quantity: 1,
          size: 'Set',
          subtotal: '$11.99',
          image: 'https://azaudio.vn/wp-content/uploads/2024/11/hydro-flask-mug-gift-set-limited-2024-2.jpg',
          description: 'Stainless steel measuring cups with engraved measurements that wont fade.'
        }
      ]
    }
  ]