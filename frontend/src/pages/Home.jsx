import React, { useEffect, useMemo, useState } from "react";
import {
  Mic,
  Brain,
  MessageCircle,
  FileText,
  Zap,
  ArrowRight,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";

// Small CountUp component for animated stats
const CountUp = ({
  end = 0,
  duration = 1600,
  formatter = (n) => n.toLocaleString(),
  suffix = "+",
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(Math.floor(eased * end));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration]);

  return (
    <span>
      {formatter(value)}
      {suffix}
    </span>
  );
};

const Home = () => {
  const features = useMemo(
    () => [
      {
        icon: FileText,
        title: "What makes it unique?",
        description:
          "We combine satellite data, census stats, and AI-powered narratives into one easy-to-use dashboard with transparency and source citations.",
        path: "/app-uniquness",
        gradient: "from-cyan-500 via-blue-500 to-fuchsia-600",
      },
      {
        icon: Brain,
        title: "What is this platform about?",
        description:
          "It's a role-based dashboard that shows how Pune is changing—urban growth, green cover loss, and flood risks—through maps, charts, and simple insights.",
        path: "/about-platform",
        gradient: "from-purple-500 via-fuchsia-500 to-pink-500",
      },
      {
        icon: Mic,
        title: "Do I need technical Knowledge to use it?",
        description:
          "No, the dashboard is simple, citizens get plain language summaries, while NGOs/reporters can drive deeper.",
        path: "/earth",
        gradient: "from-blue-500 via-cyan-500 to-emerald-500",
      },
      {
        icon: MessageCircle,
        title: "How is this different from Google Maps?",
        description:
          "Unlike maps, we show change over time (urban growth, green loss) with role based insights.",
        path: "/ai-doubt-solver",
        gradient: "from-amber-500 via-orange-500 to-rose-500",
      },
    ],
    []
  );

  const stats = useMemo(
    () => [
      { icon: FileText, label: "Users", value: 12000 },
      { icon: Brain, label: "Urbanization", value: 8500 },
      { icon: Mic, label: "Services", value: 4000 },
    ],
    []
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section with Earth Background */}
      <div className="relative w-screen h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(./textures/landingBg.jpg)` }}
        />

        {/* Tagline Overlay */}
        <div className="absolute inset-0 flex items-end justify-center pb-96 z-10">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wider drop-shadow-2xl mb-8">
              <span className="opacity-90 hover:opacity-100 transition-opacity duration-500">
                Map.{" "}
              </span>
              <span className="text-cyan-300 opacity-90 hover:opacity-100 transition-opacity duration-500">
                Analyze.{" "}
              </span>
              <span className="text-blue-400 opacity-90 hover:opacity-100 transition-opacity duration-500">
                Transform.
              </span>
            </h1>

            {/* Subtle subtitle */}
            {/* <p className="mt-8 text-xl md:text-2xl text-white/80 font-light tracking-wide">
              See Pune's Evolution Through Data
            </p> */}

            {/* CTA Button */}
            {/* <div className="mt-12">
              <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-md border border-white/20 rounded-full text-white font-semibold text-lg hover:from-cyan-500/30 hover:to-blue-500/30 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                Explore Platform
                <ArrowRight className="h-5 w-5" />
              </button>
            </div> */}
          </div>
        </div>

        {/* Gradient Overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-0" />
      </div>

      <section className="relative z-10 overflow-hidden bg-gradient-to-br   bg-black to-black text-white">
        {/* Background accents */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          {/* <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-gradient-to-tr from-cyan-500/25 to-fuchsia-500/25 blur-3xl" />
          <div className="absolute -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15),rgba(0,0,0,0)_60%)]" /> */}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-28">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur-sm">
              <Zap className="h-3.5 w-3.5 text-cyan-300" />
              <span>Bayes-ic</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              See Pune's Change, Shape Its Future
            </h1>
            <p className="mt-5 max-w-3xl text-lg md:text-xl text-white/80">
              Making complex satellite and census data simple for reporters,
              NGOs and citizens.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link 
              to="/earth"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 px-7 py-3 text-base font-semibold text-white shadow-[0_15px_40px_-10px_rgba(56,189,248,0.55)] transition-all hover:shadow-[0_20px_50px_-12px_rgba(168,85,247,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60">
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              See your City Evolve, One Map at a Time.
            </h2>
            <p className="text-white/70 text-lg">
              Four focused tools. One seamless experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map(
              ({ icon: Icon, title, description, path, gradient }, idx) => (
                <div
                  key={title}
                  className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_25px_60px_-15px_rgba(56,189,248,0.3)] cursor-pointer"
                >
                  <div
                    className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-[0_10px_30px_-10px_rgba(56,189,248,0.55)] group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed mb-5">
                    {description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-cyan-300/90">
                      Go
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/90 transition-all group-hover:translate-x-0.5">
                      Open <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-white/20"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 sm:py-20 bg-black">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-0 right-0 top-0 mx-auto h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {stats.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-6 backdrop-blur-md"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/7 text-cyan-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm text-white/70">{label}</span>
                </div>
                <div className="flex items-end gap-2">
                  <div className="text-3xl md:text-4xl font-extrabold text-white">
                    <CountUp end={value} />
                  </div>
                  <BarChart3 className="h-5 w-5 text-cyan-300/80 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-fuchsia-500/15"></section>
    </div>
  );
};

export default Home;
