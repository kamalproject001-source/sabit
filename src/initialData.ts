import { KearifanLokal, Consultation, Volunteer } from './types';

export const initialKearifanLokal: KearifanLokal[] = [
  {
    id: 'wisdom-baduy',
    title: 'Sistem Reuma & Tata Ruang Baduy',
    region: 'Lebak, Banten',
    category: 'Harmoni Lingkungan',
    description: 'Sistem zonasi tradisional berbasis kosmologi yang membagi wilayah menjadi daerah sakral (leuweung titipan), pemukiman (leuweung garapan), dan pertanian. Mengharuskan struktur rumah panggung kayu dengan pondasi batu umpak tanpa merusak kontur tanah asli.',
    philosophies: [
      'Lojor teu menang dipotong, pondok teu menang disambung (Apa adanya harus dijaga tanpa merusak bentuk alam)',
      'Arah selatan dianggap sakral sebagai kiblat kosmologi (Sasaka Pusaka Buana)',
      'Konsep replika mikro-makro: tata letak rumah mencerminkan tata letak jagat raya'
    ],
    bestPractices: [
      'Konstruksi bangunan fleksibel menggunakan bambu, kayu, dan atap ijuk untuk ketahanan gempa.',
      'Melarang perataan tanah (cut and fill); ketinggian tiang rumah menyesuaikan kontur alami bukit.',
      'Sistem drainase alami menggunakan batu kali bersusun untuk meredam aliran air hujan dan mencegah erosi.'
    ]
  },
  {
    id: 'wisdom-bena',
    title: 'Zonasi Berundak Kampung Adat Bena',
    region: 'Ngada, Flores, NTT',
    category: 'Zonasi Adat',
    description: 'Pola pemukiman berundak di lereng gunung api yang dirancang mengikuti topografi ekstrem demi mitigasi longsor dan pengaturan sirkulasi udara mikro yang sejuk.',
    philosophies: [
      'Penghormatan tertinggi kepada leluhur di puncak bukit (Ngadhu dan Bhaga sebagai simbol bapak-ibu pendiri suku)',
      'Keseimbangan dualisme arsitektur maskulin dan feminin di tengah pekarangan komunal',
      'Gotong royong horizontal antar klan dalam membangun teras pemukiman'
    ],
    bestPractices: [
      'Penyusunan batu alam (talud tradisional) tanpa semen untuk menahan erosi lereng terjal.',
      'Bagian tengah pekarangan dibiarkan terbuka sebagai ruang resapan air utama sekaligus pusat upacara sosial.',
      'Orientasi bangunan memanjang Utara-Selatan untuk meminimalkan paparan langsung radiasi matahari harian.'
    ]
  },
  {
    id: 'wisdom-bali',
    title: 'Sanga Mandala & Tri Hita Karana',
    region: 'Bali',
    category: 'Zonasi Adat',
    description: 'Pembagian sembilan zona spasial berdasarkan sumbu suci (Kaja-Kelod, arah gunung-laut) dan sumbu matahari (Kangin-Kauh, arah terbit-terbenam). Mengatur keserasian antara Tuhan, manusia, dan lingkungan alam.',
    philosophies: [
      'Tri Hita Karana (Tiga hubungan harmonis penyebab kebahagiaan)',
      'Sumpah kosmologis kelestarian alam: Parahyangan, Pawongan, Palemahan',
      'Gunung Agung sebagai pusat orientasi suci tertinggi (Utamaning Utama)'
    ],
    bestPractices: [
      'Pekarangan rumah dibagi menjadi zona Utama (tempat suci), Madya (ruang tidur/tinggal), dan Nista (kandang/sampah).',
      'Pembatasan ketinggian bangunan maksimal setinggi pohon kelapa (~15 meter) demi pelestarian cakrawala alam.',
      'Jaringan irigasi terpadu (Subak) yang mengelola dan membagi air secara demokratis dan adil berdasarkan gravitasi alami.'
    ]
  },
  {
    id: 'wisdom-ciptagelar',
    title: 'Ketahanan Pangan Kasepuhan Ciptagelar',
    region: 'Sukabumi, Jawa Barat',
    category: 'Mitigasi Bencana',
    description: 'Sistem pemukiman adat yang mengintegrasikan ketahanan pangan mutlak melalui zonasi lumbung padi (Leuit) komunal dan pembagian kerja berbasis kalender astronomi tradisional.',
    philosophies: [
      'Pare mah nyawaan (Padi memiliki nyawa/ruh kemuliaan yang tidak boleh diperdagangkan)',
      'Siklus hidup selaras dengan tanda-tanda rasi bintang Kerti dan Kidang',
      'Masyarakat wajib menyimpan cadangan pangan minimal untuk konsumsi 3 tahun ke depan'
    ],
    bestPractices: [
      'Penempatan Leuit (lumbung padi) terpisah dari rumah tinggal untuk mengantisipasi kebakaran massal.',
      'Arsitektur Leuit dengan sistem ventilasi optimal bebas tikus dan kelembapan tinggi, mampu mengawetkan padi hingga puluhan tahun.',
      'Zonasi hutan tutupan (Leuweung Titipan) di hulu sungai yang dilarang keras untuk disentuh demi menjaga pasokan mata air konstan.'
    ]
  }
];

export const initialVolunteers: Volunteer[] = [
  {
    id: 'vol-sabit',
    name: 'Sabit Nur Kamal',
    email: 'sabit@cendekia.sch.id',
    title: 'Peneliti Muda Tata Ruang Nusantara',
    institution: 'SMA Cendekia BAZNAS, Bogor',
    certifiedHours: 32,
    consultationsAnswered: 4
  },
  {
    id: 'vol-trisyanda',
    name: 'Trisyanda Rafif Rachman',
    email: 'trisyanda@cendekia.sch.id',
    title: 'Spesialis Antropologi Komunikasi Spasial',
    institution: 'SMA Cendekia BAZNAS, Bogor',
    certifiedHours: 28,
    consultationsAnswered: 3
  }
];

export const initialConsultations: Consultation[] = [
  {
    id: 'cons-1',
    userId: 'user-kamal',
    userName: 'Kamal Pratama',
    title: 'Pembangunan Rumah di Lereng Curam Sentul',
    location: 'Sentul, Bogor, Jawa Barat',
    terrainType: 'Lereng Gunung Terjal / Curam',
    wisdomPreferenceId: 'wisdom-baduy',
    question: 'Saya berencana membangun rumah tinggal kecil di area berbukit Sentul. Kontur tanahnya miring. Bagaimana tata cara pendirian tiang dan pondasi agar aman dari longsor tetapi tidak merusak lingkungan sekitar seperti menguruk tanah berlebihan?',
    status: 'answered',
    createdAt: '2026-05-18T10:00:00Z',
    answer: {
      id: 'ans-1',
      volunteerId: 'vol-sabit',
      volunteerName: 'Sabit Nur Kamal',
      volunteerTitle: 'Peneliti Muda Tata Ruang Nusantara',
      response: 'Berdasarkan nilai-nilai dari arsitektur tradisional Baduy, penyelesaian terbaik untuk lereng miring adalah dengan metode "Nyangga Bumi" atau penyesuaian tiang tanpa meratakan tanah (cut and fill). Hindari meratakan lereng secara agresif karena memicu ketidakstabilan struktur tanah makro.\n\nSaran taktis:\n1. Gunakan pondasi umpak batu kali tanpa semen agar dinamis menyerap getaran gempa.\n2. Tinggikan tiang bagian luar (yang berada di kemiringan bawah) sehingga lantai tetap sejajar horizontal tanpa mengeruk bukit.\n3. Pertahankan vegetasi berakar kuat di sekeliling rumah untuk menahan butiran tanah lereng.',
      wisdomRecommendation: 'Filosofi Baduy: "Lojor teu menang dipotong, pondok teu menang disambung" - mengharuskan kita menerima kontur tanah asli apa adanya.',
      createdAt: '2026-05-18T14:30:00Z'
    }
  },
  {
    id: 'cons-2',
    userId: 'user-kamal',
    userName: 'Kamal Pratama',
    title: 'Drainase Lingkungan Rawan Banjir di Bekasi',
    location: 'Bekasi Timur, Jawa Barat',
    terrainType: 'Dataran Rendah Rawan Banjir',
    wisdomPreferenceId: 'wisdom-bena',
    question: 'Di lingkungan perumahan kami, setiap musim hujan lebat sering terjadi genangan air setinggi 30cm karena saluran selokan beton mampet dan air tidak terserap. Adakah konsep resapan atau tata pekarangan tradisional yang bisa dijadikan inspirasi praktis?',
    status: 'pending',
    createdAt: '2026-05-19T08:15:00Z'
  },
  {
    id: 'cons-3',
    userId: 'user-budi',
    userName: 'Budi Hartono',
    title: 'Suhu Udara Panas di Pekarangan Rumah Perkotaan',
    location: 'Surabaya, Jawa Timur',
    terrainType: 'Daerah Kering dan Padat Penduduk',
    wisdomPreferenceId: 'wisdom-bali',
    question: 'Pekarangan rumah saya bertembok tinggi dan terasa sangat pengap. Bagaimana pembagian zona pekarangan ala tradisional yang bisa memaksimalkan aliran angin sejuk?',
    status: 'pending',
    createdAt: '2026-05-20T01:40:00Z'
  }
];
