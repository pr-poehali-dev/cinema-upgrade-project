import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const HERO_IMG = 'https://cdn.poehali.dev/projects/50f7f876-2da8-4bd3-8acd-b8ebc7d60d01/files/b81f7a66-4293-4516-95b1-92db22ccd464.jpg';
const STILL_IMG = 'https://cdn.poehali.dev/projects/50f7f876-2da8-4bd3-8acd-b8ebc7d60d01/files/fd1dfb0d-6656-4ce9-ab8d-30e38475d631.jpg';

const POSTER_MAIN = 'https://cdn.poehali.dev/projects/50f7f876-2da8-4bd3-8acd-b8ebc7d60d01/bucket/95e2477f-6689-448b-a579-c0019ba0d497.png';
const PHOTO_KUDRYA = 'https://cdn.poehali.dev/projects/50f7f876-2da8-4bd3-8acd-b8ebc7d60d01/bucket/833607ee-175c-4735-8623-124ae0be51fa.jpg';
const PHOTO_ALEKS = 'https://cdn.poehali.dev/projects/50f7f876-2da8-4bd3-8acd-b8ebc7d60d01/bucket/e15a599e-6e60-4fe2-a9bb-71eb0488e062.jpg';
const PHOTO_MOROZOVA = 'https://cdn.poehali.dev/projects/50f7f876-2da8-4bd3-8acd-b8ebc7d60d01/bucket/8a6f5c80-698f-4b1c-b8a4-a2a0ca05f781.jpg';
const PHOTO_VOLOSHINA = 'https://cdn.poehali.dev/projects/50f7f876-2da8-4bd3-8acd-b8ebc7d60d01/bucket/cd6a6139-136c-4b75-b2a5-efcdba08bf85.jpg';

const NAV = [
  { id: 'hero', label: 'Главная' },
  { id: 'seasons', label: 'Сезоны' },
  { id: 'heroes', label: 'Герои' },
  { id: 'episodes', label: 'Эпизоды' },
  { id: 'chronicles', label: 'Хроника' },
  { id: 'poster', label: 'Афиша' },
  { id: 'timeline', label: 'Лента памяти' },
  { id: 'minute', label: 'Видео за минуту' },
  { id: 'gallery', label: 'Галерея' },
  { id: 'community', label: 'Сообщество' },
];

const SEASONS = [
  { n: 1, title: 'Начало', status: 'Доступен', episodes: 8, year: 2024, locked: false },
  { n: 2, title: 'Разлом', status: 'Скоро', episodes: 8, year: 2025, locked: true },
  { n: 3, title: 'Тени', status: 'В разработке', episodes: 8, year: 2026, locked: true },
  { n: 4, title: 'Возвращение', status: 'В разработке', episodes: 8, year: 2026, locked: true },
  { n: 5, title: 'Финал', status: 'В разработке', episodes: 10, year: 2027, locked: true },
  { n: 6, title: 'Эксклюзив', status: 'Секретный', episodes: 6, year: '???', locked: true },
];

const HEROES = [
  {
    name: 'Иван Данилович Кудря',
    role: 'Разведчик-нелегал',
    img: PHOTO_KUDRYA,
    feat: 'Руководил разведывательной сетью в оккупированном Киеве. Передавал данные о немецких войсках вплоть до ареста в 1942 году. Герой Советского Союза посмертно.',
    years: '1912–1942',
    badge: 'Сезон 1',
  },
  {
    name: 'Павел Гаврилович Алексахин',
    role: 'Участник подполья',
    img: PHOTO_ALEKS,
    feat: 'Боец советского сопротивления. Участвовал в организации подпольной работы на оккупированной территории в годы Великой Отечественной войны.',
    years: '1920-е–1940-е',
    badge: 'Эпизод 4',
  },
  {
    name: 'Анна Морозова',
    role: 'Радистка подполья',
    img: PHOTO_MOROZOVA,
    feat: 'Радистка партизанского отряда «Артур». Обеспечивала связь с Большой землёй в глубоком немецком тылу. Погибла в бою в 1944 году. Герой Советского Союза посмертно.',
    years: '1921–1944',
    badge: 'Сезон 2',
  },
  {
    name: 'Вера Волошина',
    role: 'Разведчица',
    img: PHOTO_VOLOSHINA,
    feat: 'Разведчица-диверсант, заброшенная в тыл врага под Москвой в 1941 году. Схвачена и казнена немцами в тот же день, что и Зоя Космодемьянская. Герой России посмертно.',
    years: '1919–1941',
    badge: 'Сезон 1',
  },
];

const CHRONICLES = [
  {
    date: '22 июня 1941',
    op: 'Рубеж',
    type: 'Операция',
    text: 'Начало величайшего противостояния. Первые часы войны глазами наших героев — именно этому посвящён финальный эпизод первого сезона.',
    tag: 'Ключевое событие',
  },
  {
    date: '14 октября 1941',
    op: 'Вяземский котёл',
    type: 'Подвиг',
    text: 'Громов с семью бойцами двое суток удерживал переправу, пока не подошло подкрепление. Эта история станет центром второго сезона.',
    tag: 'Сезон 2',
  },
  {
    date: '19 ноября 1942',
    op: 'Операция «Уран»',
    type: 'Поворот',
    text: 'Контрнаступление под Сталинградом. Светлова получила приказ, который изменил всё. Подробности — в третьем эпизоде.',
    tag: 'Скоро',
  },
  {
    date: '5 июля 1943',
    op: 'Курская дуга',
    type: 'Операция',
    text: 'Крупнейшее танковое сражение. Где в этом аду оказался Зайцев — расскажет четвёртый сезон.',
    tag: 'В разработке',
  },
];

const POSTERS = [
  { title: 'Сезон 1: Начало', sub: 'Уже доступен', date: '1 сентября 2024', img: POSTER_MAIN, hot: true },
  { title: 'Сезон 2: Разлом', sub: 'Скоро', date: '2025', img: POSTER_MAIN, hot: false },
  { title: 'Эксклюзивный сезон', sub: 'Закрытый показ', date: '???', img: POSTER_MAIN, hot: false },
];

const TIMELINE = [
  { year: 1929, title: 'Великий перелом', text: 'Начало эпохи перемен. Страна меняется на глазах — индустриализация набирает обороты.' },
  { year: 1932, title: 'Первая пятилетка', text: 'Стройки века и трудовые подвиги. Время надежд и тяжёлых испытаний.' },
  { year: 1934, title: 'Новый ритм', text: 'Города растут, заводы дымят. Жизнь героев нашей истории переплетается с эпохой.' },
  { year: 1937, title: 'Тревожное затишье', text: 'Тени сгущаются. Каждый шаг становится выбором между правдой и выживанием.' },
  { year: 1939, title: 'Накануне', text: 'Мир балансирует на грани. Воспоминания этого года — самые острые в проекте.' },
  { year: 1941, title: 'Рубеж', text: 'Год, изменивший всё. Финальная точка ленты памяти и начало новой главы.' },
];

const MINUTE_CLIPS = [
  { n: 1, title: 'Открытие', dur: '1:00', desc: 'Первая минута истории — атмосфера задаётся с первого кадра.' },
  { n: 2, title: 'Знакомство', dur: '1:30', desc: 'Герои выходят на сцену. Кто они и что ими движет.' },
  { n: 3, title: 'Поворот', dur: '2:15', desc: 'Событие, после которого ничего не будет прежним.' },
  { n: 4, title: 'Кульминация', dur: '3:00', desc: 'Самый напряжённый фрагмент — три минуты на одном дыхании.' },
  { n: 5, title: 'Развязка', dur: '1:45', desc: 'Эпилог, который оставляет вопросы и предвкушение.' },
];

const EPISODES = [
  { n: 1, title: 'Пробуждение', dur: '24:10', desc: 'Где всё начинается. Первый шаг в неизвестность.' },
  { n: 2, title: 'Эхо прошлого', dur: '26:45', desc: 'Воспоминания, которые меняют всё.' },
  { n: 3, title: 'Перекрёсток', dur: '23:30', desc: 'Выбор, от которого нельзя отказаться.' },
  { n: 4, title: 'Гроза', dur: '28:00', desc: 'Буря приближается. Никто не готов.' },
];

const MOMENTS = [
  { id: 1, text: 'Финальная сцена на крыше', votes: 1284 },
  { id: 2, text: 'Откровение в эпизоде 2', votes: 967 },
  { id: 3, text: 'Погоня под дождём', votes: 842 },
  { id: 4, text: 'Молчаливый диалог', votes: 631 },
];

const GALLERY = [POSTER_MAIN, PHOTO_KUDRYA, PHOTO_ALEKS, PHOTO_MOROZOVA, PHOTO_VOLOSHINA, HERO_IMG];

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          onMouseEnter={() => setHover(s)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(s)}
          className="transition-transform hover:scale-125"
          aria-label={`Оценка ${s}`}
        >
          <Icon
            name="Star"
            size={20}
            className={(hover || value) >= s ? 'text-primary fill-primary' : 'text-muted-foreground'}
          />
        </button>
      ))}
    </div>
  );
}

const CHRONICLE_COLORS: Record<string, string> = {
  'Операция': 'text-primary border-primary/40 bg-primary/10',
  'Подвиг': 'text-accent border-accent/40 bg-accent/10',
  'Поворот': 'text-foreground border-border bg-muted',
};

const Index = () => {
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [votes, setVotes] = useState<Record<number, number>>({});
  const [voted, setVoted] = useState<Set<number>>(new Set());
  const [activeYear, setActiveYear] = useState(0);
  const [activeClip, setActiveClip] = useState(0);
  const [activeHero, setActiveHero] = useState<number | null>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const vote = (id: number, base: number) => {
    if (voted.has(id)) return;
    setVotes((p) => ({ ...p, [id]: (p[id] ?? base) + 1 }));
    setVoted((p) => new Set(p).add(id));
  };

  return (
    <div className="film-grain min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 glass border-b border-border/50">
        <nav className="container flex items-center justify-between h-16">
          <button onClick={() => scrollTo('hero')} className="font-display font-700 text-xl tracking-[0.3em] text-primary">
            MEMORY
          </button>
          <div className="hidden lg:flex items-center gap-5">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wide"
              >
                {n.label}
              </button>
            ))}
          </div>
          <Button size="sm" onClick={() => scrollTo('episodes')} className="font-display tracking-wider">
            <Icon name="Play" size={14} className="mr-1" /> Смотреть
          </Button>
        </nav>
      </header>

      {/* ═══ HERO с видеотизером ═══ */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Видео-фон */}
        <div className="absolute inset-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={HERO_IMG}
          >
            <source src="https://edge-msk-11.kinescopecdn.net/9a9d4c43-ff34-4a41-bd30-098930953d71/videos/064ef0bc-2243-4382-a25f-cb9900c84b9f/mp4/019eeb2d-3337-7573-8931-b789db0312bb/019eeb2d-2e5b-79c9-a67d-0fe8de5b212f.mp4" type="video/mp4" />
          </video>
          {/* Если видео не загрузилось — показываем картинку */}
          <img src={HERO_IMG} alt="" className="absolute inset-0 w-full h-full object-cover -z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
          <div className="absolute inset-0 vignette" />
        </div>

        {/* Блоб-свечения */}
        <div className="absolute -bottom-40 left-1/4 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[140px] animate-glow-pulse pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] animate-glow-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

        {/* Контент */}
        <div className="container relative z-10 pt-20">
          <div className="max-w-2xl">
            <p className="font-display tracking-[0.5em] text-accent text-sm mb-6 animate-fade-in uppercase">
              Оригинальный сериал · 6 сезонов
            </p>
            <h1 className="font-display font-700 text-6xl md:text-8xl leading-[0.9] mb-6 animate-fade-up text-gradient">
              MEMORY<br />PROJECT
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mb-10 animate-fade-up" style={{ animationDelay: '0.15s', opacity: 0 }}>
              Кинематографичная история, разворачивающаяся через шесть сезонов. Эпизоды, эксклюзивы и атмосфера большого кино.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
              <Button size="lg" onClick={() => scrollTo('episodes')} className="font-display tracking-wider glow-amber text-base px-8">
                <Icon name="Play" size={18} className="mr-2" /> Смотреть эпизоды
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo('heroes')} className="font-display tracking-wider text-base px-8 border-border">
                <Icon name="Users" size={16} className="mr-2" /> Герои
              </Button>
            </div>
            <div className="flex gap-8 mt-14 animate-fade-in" style={{ animationDelay: '0.5s', opacity: 0 }}>
              {[['6', 'сезонов'], ['48+', 'эпизодов'], ['9.4', 'рейтинг']].map(([v, l]) => (
                <div key={l}>
                  <div className="font-display font-700 text-3xl text-primary">{v}</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Индикатор видео */}
        <div className="absolute bottom-10 right-10 glass rounded-xl px-4 py-2 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Видеотизер
        </div>

        <button onClick={() => scrollTo('seasons')} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce">
          <Icon name="ChevronDown" size={28} />
        </button>
      </section>

      {/* ═══ СЕЗОНЫ ═══ */}
      <section id="seasons" className="py-28 relative">
        <div className="container">
          <SectionTitle kicker="Хронология" title="Сезоны" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
            {SEASONS.map((s, i) => (
              <div
                key={s.n}
                className="group relative rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all duration-500 animate-fade-up"
                style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={i % 2 ? STILL_IMG : HERO_IMG} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                  {s.locked && (
                    <div className="absolute top-3 right-3 glass rounded-full p-2">
                      <Icon name="Lock" size={14} className="text-muted-foreground" />
                    </div>
                  )}
                  <span className="absolute top-3 left-3 font-display font-700 text-5xl text-primary/80">0{s.n}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-display font-600 text-xl tracking-wide">{s.title}</h3>
                    <span className="text-xs text-muted-foreground">{s.year}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{s.episodes} эпизодов</p>
                  <span className={`inline-flex items-center gap-1.5 text-xs uppercase tracking-wider px-3 py-1 rounded-full ${s.locked ? 'bg-accent/10 text-accent/70' : 'bg-primary/20 text-primary'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${s.locked ? 'bg-accent/60' : 'bg-primary animate-pulse'}`} />
                    {s.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ГЕРОИ ═══ */}
      <section id="heroes" className="py-28 relative bg-card/30 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="container relative">
          <SectionTitle kicker="Досье" title="Герои" />
          <p className="text-muted-foreground mt-4 max-w-lg">Люди, чьи судьбы вплетены в историю проекта. Нажми на карточку — узнай их подвиг.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
            {HEROES.map((h, i) => (
              <button
                key={h.name}
                onClick={() => setActiveHero(activeHero === i ? null : i)}
                className={`group text-left rounded-2xl border overflow-hidden transition-all duration-500 animate-fade-up ${activeHero === i ? 'border-primary glow-amber' : 'border-border hover:border-primary/40'}`}
                style={{ animationDelay: `${i * 0.09}s`, opacity: 0 }}
              >
                {/* Портрет */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={h.img}
                    alt={h.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: 'contrast(1.05) brightness(0.9)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                  <span className={`absolute top-3 right-3 text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border font-medium ${activeHero === i ? 'border-primary bg-primary/20 text-primary' : 'glass border-border/60 text-muted-foreground'}`}>
                    {h.badge}
                  </span>
                </div>

                {/* Инфо */}
                <div className="p-4 bg-card">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-accent mb-1">{h.role}</p>
                  <h3 className="font-display font-600 text-xl tracking-wide mb-0.5">{h.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{h.years}</p>

                  {/* Подвиг — раскрывается при клике */}
                  <div className={`overflow-hidden transition-all duration-500 ${activeHero === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="border-t border-border/50 pt-3">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-primary mb-2 flex items-center gap-1.5">
                        <Icon name="Shield" size={11} /> Подвиг
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{h.feat}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Icon name={activeHero === i ? 'ChevronUp' : 'ChevronDown'} size={14} />
                    {activeHero === i ? 'Свернуть' : 'Подвиг'}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ЭПИЗОДЫ + РЕЙТИНГ ═══ */}
      <section id="episodes" className="py-28 relative">
        <div className="container">
          <SectionTitle kicker="Сезон 1 · Начало" title="Эпизоды" />
          <p className="text-muted-foreground mt-4 max-w-lg">Оцени каждый эпизод — твои звёзды формируют рейтинг сериала.</p>
          <div className="space-y-4 mt-14 max-w-4xl">
            {EPISODES.map((e, i) => (
              <div
                key={e.n}
                className="group flex flex-col sm:flex-row gap-5 p-4 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all animate-fade-up"
                style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
              >
                <div className="relative w-full sm:w-48 h-28 rounded-xl overflow-hidden shrink-0">
                  <img src={i % 2 ? HERO_IMG : STILL_IMG} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-background/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="glass rounded-full p-3 glow-amber">
                      <Icon name="Play" size={20} className="text-primary" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 glass text-xs px-2 py-0.5 rounded">{e.dur}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-display text-sm text-primary tracking-widest">ЭП. 0{e.n}</span>
                  </div>
                  <h3 className="font-display font-600 text-2xl tracking-wide mb-1">{e.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{e.desc}</p>
                  <div className="flex items-center gap-3">
                    <StarRating value={ratings[e.n] ?? 0} onChange={(v) => setRatings((p) => ({ ...p, [e.n]: v }))} />
                    {ratings[e.n] ? (
                      <span className="text-xs text-primary font-medium">Твоя оценка: {ratings[e.n]}/5</span>
                    ) : (
                      <span className="text-xs text-muted-foreground">Оцени эпизод</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ХРОНИКА ОПЕРАЦИЙ И ПОДВИГОВ ═══ */}
      <section id="chronicles" className="py-28 relative bg-card/30 overflow-hidden">
        {/* Декоративная вертикаль */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent pointer-events-none hidden lg:block" />

        <div className="container relative">
          <SectionTitle kicker="Архив · Редкие материалы" title="Хроника" />
          <p className="text-muted-foreground mt-4 max-w-lg">Операции, подвиги и ключевые события, вплетённые в ткань сериала. Обновляется редко — каждый материал важен.</p>

          <div className="mt-14 space-y-6 max-w-5xl">
            {CHRONICLES.map((c, i) => (
              <div
                key={i}
                className="group grid lg:grid-cols-[180px_1fr] gap-0 animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
              >
                {/* Дата-колонка */}
                <div className="lg:pr-8 lg:text-right mb-3 lg:mb-0 lg:pt-1">
                  <div className="font-display font-700 text-sm text-primary tracking-wider">{c.date}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{c.op}</div>
                </div>

                {/* Карточка события */}
                <div className={`relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:border-2 before:border-primary lg:before:hidden`}>
                  {/* точка на мобайле */}
                  <div className="rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-all">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`text-[10px] uppercase tracking-[0.25em] px-2.5 py-1 rounded-full border font-medium ${CHRONICLE_COLORS[c.type] ?? 'text-muted-foreground border-border bg-muted'}`}>
                        {c.type}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{c.tag}</span>
                    </div>
                    <h3 className="font-display font-700 text-2xl tracking-wide mb-2">{c.op}</h3>
                    <p className="text-muted-foreground leading-relaxed">{c.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center gap-3 text-sm text-muted-foreground animate-fade-in">
            <Icon name="RefreshCw" size={14} className="text-accent" />
            Следующее обновление хроники — после выхода 2-го сезона
          </div>
        </div>
      </section>

      {/* ═══ АФИША ═══ */}
      <section id="poster" className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, hsl(var(--primary)) 0 1px, transparent 1px 60px)' }} />
        <div className="container relative">
          <SectionTitle kicker="Официальный плакат" title="Афиша" />
          <p className="text-muted-foreground mt-4 max-w-lg">Художественно-документальный сериал «ПАМЯТЬ». 1 сезон с 1 сентября.</p>

          {/* Главный плакат — баннер */}
          <div className="mt-14 group relative overflow-hidden border border-border hover:border-primary/50 transition-all duration-500 cursor-pointer animate-scale-in glow-amber" style={{ opacity: 0 }}>
            <div className="relative w-full overflow-hidden" style={{ maxHeight: '520px' }}>
              <img
                src={POSTER_MAIN}
                alt="Плакат ПАМЯТЬ"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />

              {/* Метка доступен */}
              <div className="absolute top-5 left-5 bg-primary text-primary-foreground text-xs uppercase tracking-widest px-4 py-2 font-display font-700">
                1 СЕЗОН — СМОТРЕТЬ
              </div>

              {/* Скачать */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="glass p-5 border border-primary/40">
                  <Icon name="Download" size={28} className="text-primary" />
                </div>
              </div>

              {/* Подпись */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                <div>
                  <p className="font-display font-700 text-3xl md:text-4xl tracking-wide text-foreground">{POSTERS[0].title}</p>
                  <p className="text-muted-foreground text-sm mt-1">Художественно-документальный сериал · 16+</p>
                </div>
                <div className="text-right">
                  <span className="text-accent text-sm font-display tracking-wider uppercase">{POSTERS[0].sub}</span>
                  <p className="text-muted-foreground text-xs mt-0.5">{POSTERS[0].date}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ожидаемые релизы */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {POSTERS.slice(1).map((p, i) => (
              <div
                key={i}
                className="group relative overflow-hidden border border-border hover:border-primary/30 transition-all duration-500 cursor-pointer animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
              >
                <div className="relative overflow-hidden" style={{ maxHeight: '280px' }}>
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" style={{ filter: 'brightness(0.5) saturate(0.6)' }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                    <div>
                      <p className="font-display font-700 text-xl tracking-wide">{p.title}</p>
                      <span className="text-xs text-accent uppercase tracking-widest">{p.sub}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{p.date}</span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Icon name="Lock" size={16} className="text-muted-foreground" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ЛЕНТА ПАМЯТИ 1929–1941 ═══ */}
      <section id="timeline" className="py-28 relative overflow-hidden bg-card/30">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(90deg, hsl(var(--primary)) 0 1px, transparent 1px 120px)' }} />
        <div className="container relative">
          <SectionTitle kicker="1929 — 1941" title="Лента памяти" />
          <p className="text-muted-foreground mt-4 max-w-lg">Перемещайся по годам эпохи — каждая точка хранит воспоминание, вплетённое в историю проекта.</p>

          <div className="relative mt-16">
            <div className="absolute left-0 right-0 top-[14px] h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="flex justify-between gap-2 overflow-x-auto pb-2 -mx-1 px-1">
              {TIMELINE.map((t, i) => (
                <button
                  key={t.year}
                  onClick={() => setActiveYear(i)}
                  className="group relative flex flex-col items-center gap-3 shrink-0"
                >
                  <span className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${activeYear === i ? 'bg-primary border-primary scale-125 shadow-[0_0_18px_hsl(var(--primary))]' : 'bg-background border-muted-foreground group-hover:border-primary'}`} />
                  <span className={`font-display font-700 text-2xl md:text-3xl tracking-wider transition-colors ${activeYear === i ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}>
                    {t.year}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div key={activeYear} className="mt-12 grid md:grid-cols-2 gap-8 items-center animate-fade-up">
            <div className="relative rounded-2xl overflow-hidden border border-border glow-amber">
              <img src={activeYear % 2 ? STILL_IMG : HERO_IMG} alt="" className="w-full h-72 object-cover" style={{ filter: 'sepia(0.45) contrast(1.05) brightness(0.85)' }} />
              <div className="absolute inset-0 vignette" />
              <span className="absolute bottom-4 left-5 font-display font-700 text-6xl text-primary/90">{TIMELINE[activeYear].year}</span>
            </div>
            <div>
              <span className="inline-block font-display tracking-[0.3em] text-accent text-xs uppercase mb-3">Воспоминание</span>
              <h3 className="font-display font-700 text-4xl tracking-wide mb-4">{TIMELINE[activeYear].title}</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">{TIMELINE[activeYear].text}</p>
              <div className="flex gap-3 mt-8">
                <Button variant="outline" className="rounded-full border-border" onClick={() => setActiveYear((p) => Math.max(0, p - 1))} disabled={activeYear === 0}>
                  <Icon name="ChevronLeft" size={16} className="mr-1" /> Раньше
                </Button>
                <Button variant="outline" className="rounded-full border-border" onClick={() => setActiveYear((p) => Math.min(TIMELINE.length - 1, p + 1))} disabled={activeYear === TIMELINE.length - 1}>
                  Позже <Icon name="ChevronRight" size={16} className="ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ВИДЕО ЗА МИНУТУ ═══ */}
      <section id="minute" className="py-28 relative">
        <div className="container">
          <SectionTitle kicker="Один ролик · по кусочкам" title="Видео за минуту" />
          <p className="text-muted-foreground mt-4 max-w-lg">Большая история, разбитая на короткие фрагменты по 1–3 минуты. Смотри по частям — в любом порядке.</p>

          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8 mt-14">
            <div key={activeClip} className="relative rounded-2xl overflow-hidden border border-border bg-card glow-amber animate-scale-in">
              <div className="relative aspect-video">
                <img src={activeClip % 2 ? HERO_IMG : STILL_IMG} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
                  <button className="glass rounded-full p-6 glow-amber hover:scale-110 transition-transform">
                    <Icon name="Play" size={32} className="text-primary fill-primary" />
                  </button>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-4">
                  <div className="flex gap-1.5">
                    {MINUTE_CLIPS.map((_, i) => (
                      <span key={i} className={`h-1 flex-1 rounded-full transition-all ${i < activeClip ? 'bg-primary' : i === activeClip ? 'bg-primary animate-glow-pulse' : 'bg-muted'}`} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <span className="font-display text-xs text-primary tracking-widest">ФРАГМЕНТ {activeClip + 1} / {MINUTE_CLIPS.length}</span>
                  <h3 className="font-display font-600 text-2xl tracking-wide">{MINUTE_CLIPS[activeClip].title}</h3>
                </div>
                <span className="glass px-3 py-1 rounded-full text-sm text-primary font-medium">{MINUTE_CLIPS[activeClip].dur}</span>
              </div>
            </div>

            <div className="space-y-2.5">
              {MINUTE_CLIPS.map((c, i) => (
                <button
                  key={c.n}
                  onClick={() => setActiveClip(i)}
                  className={`w-full text-left flex items-center gap-4 p-3 rounded-xl border transition-all ${activeClip === i ? 'border-primary bg-primary/10' : 'border-border bg-card hover:border-primary/40'}`}
                >
                  <span className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-display font-700 ${activeClip === i ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    {c.n}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-600 tracking-wide truncate">{c.title}</span>
                      {activeClip === i && <Icon name="Volume2" size={14} className="text-primary shrink-0" />}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{c.desc}</p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">{c.dur}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ГАЛЕРЕЯ ═══ */}
      <section id="gallery" className="py-28 bg-card/30">
        <div className="container">
          <SectionTitle kicker="Кадры" title="Галерея" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-14">
            {GALLERY.map((img, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-xl cursor-pointer animate-scale-in ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
                style={{ animationDelay: `${i * 0.06}s`, opacity: 0 }}
              >
                <img src={img} alt="" className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${i === 0 ? 'h-full min-h-[300px]' : 'h-44'}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="font-display text-sm tracking-widest text-foreground">КАДР 0{i + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ О ПРОЕКТЕ ═══ */}
      <section id="about" className="py-28 relative">
        <div className="container grid md:grid-cols-2 gap-14 items-center">
          <div className="relative rounded-2xl overflow-hidden glow-amber animate-scale-in" style={{ opacity: 0 }}>
            <img src={STILL_IMG} alt="" className="w-full h-[420px] object-cover" />
            <div className="absolute inset-0 vignette" />
          </div>
          <div>
            <SectionTitle kicker="История" title="О проекте" />
            <p className="text-muted-foreground mt-6 leading-relaxed">
              MEMORY PROJECT — самостоятельная вселенная, рассказанная через шесть сезонов. Каждый сезон — новая глава, снятая с кинематографичным вниманием к атмосфере, свету и деталям.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Мы создаём не просто ролики, а полноценное кинопространство: эксклюзивные кадры, бонусный контент и интерактив, который объединяет зрителей.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: 'Film', t: 'Кинопродакшн', d: 'Каждый кадр — как в большом кино' },
                { icon: 'Sparkles', t: 'Эксклюзивы', d: 'Секретный 6-й сезон' },
                { icon: 'Users', t: 'Сообщество', d: 'Голосования и обсуждения' },
                { icon: 'Award', t: 'Рейтинги', d: 'Зрители формируют оценки' },
              ].map((f) => (
                <div key={f.t} className="p-4 rounded-xl border border-border bg-card">
                  <Icon name={f.icon} size={22} className="text-primary mb-2" />
                  <div className="font-display font-600 tracking-wide">{f.t}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{f.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ СООБЩЕСТВО ═══ */}
      <section id="community" className="py-28 bg-card/30">
        <div className="container">
          <SectionTitle kicker="Сообщество" title="Любимые моменты" />
          <p className="text-muted-foreground mt-4 max-w-lg">Голосуй за лучшие сцены сериала — самые любимые попадут в зал славы.</p>
          <div className="grid sm:grid-cols-2 gap-4 mt-14 max-w-4xl">
            {MOMENTS.map((m, i) => {
              const count = votes[m.id] ?? m.votes;
              const isVoted = voted.has(m.id);
              return (
                <div
                  key={m.id}
                  className="flex items-center justify-between gap-4 p-5 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all animate-fade-up"
                  style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
                >
                  <div>
                    <div className="font-display font-600 text-lg tracking-wide">{m.text}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{count.toLocaleString('ru')} голосов</div>
                  </div>
                  <button
                    onClick={() => vote(m.id, m.votes)}
                    disabled={isVoted}
                    className={`shrink-0 flex flex-col items-center gap-1 px-4 py-2 rounded-xl border transition-all ${isVoted ? 'border-accent bg-accent/15 text-accent' : 'border-border hover:border-accent hover:text-accent'}`}
                  >
                    <Icon name="Heart" size={20} className={isVoted ? 'fill-accent' : ''} />
                    <span className="text-xs font-medium">{isVoted ? 'Учтён' : 'Голос'}</span>
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-20 text-center relative rounded-3xl overflow-hidden border border-border p-14">
            <img src={HERO_IMG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60" />
            <div className="relative">
              <h3 className="font-display font-700 text-4xl md:text-5xl tracking-wide mb-4 text-gradient">Не пропусти 2 сезон</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">Подпишись, чтобы первым узнать о премьерах и эксклюзивах.</p>
              <Button size="lg" className="rounded-full font-display tracking-wider glow-amber px-8">
                <Icon name="Bell" size={18} className="mr-2" /> Подписаться на премьеры
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-border py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display font-700 tracking-[0.3em] text-primary">MEMORY</span>
          <p className="text-xs text-muted-foreground">© 2024–2027 MEMORY PROJECT · Все права защищены</p>
          <div className="flex gap-3">
            {['Send', 'Youtube', 'Instagram'].map((s) => (
              <button key={s} className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Icon name={s} size={16} />
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="animate-fade-up" style={{ opacity: 0 }}>
      <p className="font-display tracking-[0.4em] text-accent text-xs uppercase mb-3">{kicker}</p>
      <h2 className="font-display font-700 text-5xl md:text-6xl tracking-wide">{title}</h2>
    </div>
  );
}

export default Index;