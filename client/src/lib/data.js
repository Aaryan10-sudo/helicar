import mustangImage from "../assets/mustang.jpg";
import luklaImage from "../assets/lukla.jpg";
import pokharaImage from "../assets/pokhara.jpg";
import chandragiriImage from "../assets/chandragiri.jpg";
import swayambhuImage from "../assets/swayambhu.jpg";
import blogImage from "../assets/blogImag.jpg";

export const Destination = [
  {
    id: 1,
    name: "Mustang",
    image: mustangImage,
    description:
      "Discover the mystical land of Mustang — Nepal’s hidden kingdom beyond the Himalayas. This extraordinary journey offers a blend of Tibetan culture, dramatic landscapes, and sacred heritage that few destinations can match. Whether you're on a road trip or trekking expedition, Mustang promises an unforgettable adventure.",
  },
  { id: 2, name: "Lukla", image: luklaImage },
  { id: 3, name: "Pokhara", image: pokharaImage },
  { id: 4, name: "Chandragiri", image: chandragiriImage },
  { id: 5, name: "Swayambhu Nath", image: swayambhuImage },
];

export const Blog = [
  {
    id: 1,
    date: "Jul 12, 2020",
    title: "Chitwan Sauraha Tours",
    category: "Recent",
    image: blogImage?.src,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua labore et dolore ut labore et dolore magna.",
  },
  {
    id: 2,
    date: "Aug 15, 2021",
    title: "Pokhara Adventure",
    category: "Adventure",
    image: blogImage?.src,
    text: "Explore the beauty of Pokhara with its serene lakes, breathtaking mountain views, and thrilling adventures. A perfect getaway for nature lovers.",
  },
  {
    id: 3,
    date: "Sep 10, 2022",
    title: "Kathmandu Heritage Walk",
    category: "Heritage",
    image: blogImage?.src,
    text: "Discover the rich cultural heritage of Kathmandu with its ancient temples, bustling markets, and vibrant traditions.",
  },
];

export const Trekking = [
  {
    id: 1,
    region: "Annapurna Region",
    tours: [
      {
        id: 101,
        name: "Muktinath Trek",
        duration: "7 Days",
        price: 725,
        currency: "USD",
        imageUrl:
          "https://imgs.search.brave.com/_zrwyhBlpyTGD3lyS1xI-aJuNm3oNb5tzBq2Lpac2cw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZXZlcmVzdGpvdXJu/ZXlzLmNvbS91cGxv/YWRzL3BhY2thZ2Uv/am9tc29tLWFuZC1t/dWt0aW5hdGgtdHJl/a2tpbmcuanBlZw",
      },
      {
        id: 102,
        name: "Ghorepani Poon Hill Trek",
        duration: "5 Days",
        price: 620,
        currency: "USD",
        imageUrl:
          "https://imgs.search.brave.com/q9I7_AXZI5uryrNZiWg-9fojg3xxkn1BPenvJo_bo-g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/Ym9va2F0cmVra2lu/Zy5jb20vZGF0YS9p/bWFnZXMvMjAyMy8x/Mi9kaGF1bGFnaXJp/LXZpZXcud2VicA",
      },
      {
        id: 103,
        name: "Annapurna Base Camp Trek",
        duration: "12 Days",
        price: 1_250,
        currency: "USD",
        imageUrl:
          "https://imgs.search.brave.com/MJAGKaArf8hg9AJiomPHPYyaH6sp4hLZ9z3q_7_tUAE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bmVwYWxoaWdodHJl/ay5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjMvMTAvVHJl/ay10by1Bbm5hcHVy/bmEtQmFzZS1DYW1w/LTIuanBn",
      },
    ],
  },
  {
    id: 2,
    region: "Everest Region",
    tours: [
      {
        id: 201,
        name: "Everest Base Camp Trek",
        duration: "14 Days",
        price: 1_380,
        currency: "USD",
        imageUrl:
          "https://imgs.search.brave.com/HNr0sB-SxQXzw37ouYeByX619mZKojUCv6rfl9oJet8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YWNldGhlaGltYWxh/eWEuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIyLzA4L2Nl/bGVicmF0aW5nLXRy/ZWstc3VjY2Vzcy1h/dC1ldmVyZXN0LWJh/c2UtY2FtcC5qcGc",
      },
      {
        id: 202,
        name: "Gokyo Lakes Trek",
        duration: "10 Days",
        price: 1_100,
        currency: "USD",
        imageUrl:
          "https://imgs.search.brave.com/nGn_tIjZJzFFJQwrYAxSDVVPpuwsJ1IPfuHQWgNcelY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/Ym9va2F0cmVra2lu/Zy5jb20vZGF0YS9p/bWFnZXMvMjAyMC8w/NC9nb2t5by12YWxs/ZXktdHJlay53ZWJw",
      },
      {
        id: 203,
        name: "Everest Panorama Flight",
        duration: "1 Day",
        price: 340,
        currency: "USD",
        imageUrl:
          "https://imgs.search.brave.com/hpm3vArV9hyhE0oBRpBqSZj75Wmyx4ouYoD65fwzEK4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5zdWJsaW1ldHJh/aWxzLmNvbS91cGxv/YWRzL2ltZy9ldmVy/ZXN0LXNpZ2h0c2Vl/aW5nLXNjZW5pYy1m/bGlnaHQtdG91ci53/ZWJw",
      },
    ],
  },
];
