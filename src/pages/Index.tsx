import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const HERO_IMG = 'https://cdn.poehali.dev/projects/50f7f876-2da8-4bd3-8acd-b8ebc7d60d01/files/b81f7a66-4293-4516-95b1-92db22ccd464.jpg';
const STILL_IMG = 'https://cdn.poehali.dev/projects/50f7f876-2da8-4bd3-8acd-b8ebc7d60d01/files/fd1dfb0d-6656-4ce9-ab8d-30e38475d631.jpg';

const NAV = [
  { id: 'hero', label: 'Главная' },
  { id: 'seasons', label: 'Сезоны' },
  { id: 'episodes', label: 'Эпизоды' },
  { id: 'gallery', label: 'Галерея' },
  { id: 'about', label: 'О проекте' },
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

const GALLERY = [HERO_IMG, STILL_IMG, HERO_IMG, STILL_IMG, STILL_IMG, HERO_IMG];

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

const Index = () => {
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [votes, setVotes] = useState<Record<number, number>>({});
  const [voted, setVoted] = useState<Set<number>>(new Set());

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
          <div className="hidden md:flex items-center gap-7">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wide"
              >
                {n.label}
              </button>
            ))}
          </div>
          <Button size="sm" onClick={() => scrollTo('episodes')} className="rounded-full font-display tracking-wider">
            <Icon name="Play" size={14} className="mr-1" /> Смотреть
          </Button>
        </nav>
      </header>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
          <div className="absolute inset-0 vignette" />
        </div>
        <div className="absolute -bottom-40 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px] animate-glow-pulse" />

        <div className="container relative z-10 pt-20">
          <div className="max-w-2xl">
            <p className="font-display tracking-[0.5em] text-accent text-sm mb-6 animate-fade-in uppercase">
              Оригинальный сериал · 6 сезонов
            </p>
            <h1 className="font-display font-700 text-6xl md:text-8xl leading-[0.9] mb-6 animate-fade-up text-gradient">
              MEMORY<br />PROJECT
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mb-10 animate-fade-up" style={{ animationDelay: '0.15s', opacity: 0 }}>
              Кинематографичная история, которая разворачивается через шесть сезонов. Эпизоды, эксклюзивы и атмосфера большого кино.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
              <Button size="lg" onClick={() => scrollTo('episodes')} className="rounded-full font-display tracking-wider glow-amber text-base px-8">
                <Icon name="Play" size={18} className="mr-2" /> Смотреть эпизоды
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo('about')} className="rounded-full font-display tracking-wider text-base px-8 border-border">
                О проекте
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
        <button onClick={() => scrollTo('seasons')} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce">
          <Icon name="ChevronDown" size={28} />
        </button>
      </section>

      {/* SEASONS */}
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
                  <span className={`inline-flex items-center gap-1.5 text-xs uppercase tracking-wider px-3 py-1 rounded-full ${s.locked ? 'bg-muted text-muted-foreground' : 'bg-primary/15 text-primary'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${s.locked ? 'bg-muted-foreground' : 'bg-primary animate-pulse'}`} />
                    {s.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EPISODES + RATING */}
      <section id="episodes" className="py-28 relative bg-card/30">
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

      {/* GALLERY */}
      <section id="gallery" className="py-28">
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

      {/* ABOUT */}
      <section id="about" className="py-28 relative bg-card/30">
        <div className="container grid md:grid-cols-2 gap-14 items-center">
          <div className="relative rounded-2xl overflow-hidden glow-amber animate-scale-in" style={{ opacity: 0 }}>
            <img src={STILL_IMG} alt="" className="w-full h-[420px] object-cover" />
            <div className="absolute inset-0 vignette" />
          </div>
          <div>
            <SectionTitle kicker="История" title="О проекте" />
            <p className="text-muted-foreground mt-6 leading-relaxed">
              MEMORY PROJECT — это самостоятельная вселенная, рассказанная через шесть сезонов. Каждый сезон — новая глава, снятая с кинематографичным вниманием к атмосфере, свету и деталям.
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

      {/* COMMUNITY — VOTE FOR MOMENTS */}
      <section id="community" className="py-28">
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
                    className={`shrink-0 flex flex-col items-center gap-1 px-4 py-2 rounded-xl border transition-all ${isVoted ? 'border-primary bg-primary/15 text-primary' : 'border-border hover:border-primary hover:text-primary'}`}
                  >
                    <Icon name={isVoted ? 'Heart' : 'Heart'} size={20} className={isVoted ? 'fill-primary' : ''} />
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
              <p className="text-muted-foreground max-w-md mx-auto mb-8">Подпишись, чтобы первым узнать о премьерах новых сезонов и эксклюзивах.</p>
              <Button size="lg" className="rounded-full font-display tracking-wider glow-amber px-8">
                <Icon name="Bell" size={18} className="mr-2" /> Подписаться на премьеры
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
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
