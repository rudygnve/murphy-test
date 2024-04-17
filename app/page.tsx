import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden h-screen">
      <header className="w-full border-b bg-white z-1000 sticky top-0">
        <nav className="w-full max-w-7xl mx-auto h-20 flex items-center justify-between px-3">
          <div className="w-full fixed md:hidden top-20 bg-prime py-10 shadow-lg transition-all duration-500 bottom-0 left-[100%] flex flex-col items-center justify-center text-center gap-6 mobile-menu">
            <Link href="#howitworks" className="text-neutral-900 text-lg">
              How it works
            </Link>
            <Link href="#pricing" className="text-neutral-900 text-lg">
              Pricing
            </Link>
            <button className="w-fit px-3 button rounded text-prime bg-white text-center py-3 cursor pointer transition duration-200 active:scale-95">
              7 Day Free Trial
            </button>
          </div>
          <Link href="/">
            <img
              src="/assets/images/murphy_logo.png"
              className="w-28 md:w-32"
              alt="Logo"
            />
          </Link>
          <div className="flex items-center gap-3 md:gap-6">
            <Link
              href="#howitworks"
              className="text-neutral-900 text-sm md:block hidden"
            >
              How it works
            </Link>
            <Link
              href="#pricing"
              className="text-neutral-900 text-sm md:block hidden"
            >
              Pricing
            </Link>
            <Link
              href=""
              className="h-10 md:flex hidden items-center justify-center px-3 text-sm rounded bg-prime text-white border-2 border-prime"
            >
              7 Day Free Trial
            </Link>
            <Link
              href="/login"
              className="h-10 flex items-center justify-center px-8 text-sm rounded text-neutral-900 border-2 border-neutral-900 font-medium"
            >
              Login
            </Link>
            <button className="w-10 h-10 border-2 border-prime bg-prime md:hidden rounded flex items-center justify-center menu-toggle">
              <img
                src="/assets/icons/hamburger.svg"
                className="w-6 toggle-icon"
                alt="Menu"
              />
            </button>
          </div>
        </nav>
      </header>
      <section className="w-full py-12 md:py-16 px-3">
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center">
          <h1 className="md:text-5xl text-4xl font-timeburner-bold text-prime mb-6 leading-[130%]">
            Beat your competitors to work in your area
          </h1>
          <h2 className="text-prime text-2xl md:text-3xl font-timeburner-normal mb-10">
            Get notified immediately when somebody is looking to hire.
          </h2>
          <div className="w-full max-w-4xl">
            <img
              src="/assets/images/hero.png"
              className="w-full max-w-5xl"
              alt=""
            />
          </div>
        </div>
      </section>
      <section id="howitworks" className="w-full py-12 md:py-16 px-3">
        <div className="w-full max-w-7xl mx-auto flex flex-col">
          <h3 className="text-4xl md:text-5xl font-timeburner-bold text-center mb-8 md:mb-20 text-prime">
            How it works
          </h3>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center mb-16 md:mb-20">
            <div className="w-full flex items-center justify-center">
              <img
                src="/assets/images/howitworks.png"
                className="md:block hidden w-[80%]"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-10">
              <div className="flex gap-4">
                <div className="w-16 text-center h-12 flex items-center justify-center rounded bg-prime text-xl text-white">
                  1
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <h4 className="text-3xl font-timeburner-bold mt-2 text-neutra-900">
                    Sign Up
                  </h4>
                  <span className="text-neutral-900 leading-8 font-medium">
                    Sign up for a free trial with us
                  </span>
                </div>
              </div>
              <div className="w-full flex gap-4">
                <div className="w-16 text-center h-12 flex items-center justify-center rounded bg-prime text-xl text-white">
                  2
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <h4 className="text-3xl font-timeburner-bold mt-2 text-neutra-900">
                    Add Facebook groups
                  </h4>
                  <span className="text-neutral-900 leading-8 font-medium">
                    Select the Facebook groups you'd like to monitor, wherever
                    you are in them or not!
                  </span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-16 text-center h-12 flex items-center justify-center rounded bg-prime text-xl text-white">
                  3
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <h4 className="text-3xl font-timeburner-bold mt-2 text-neutra-900">
                    Add keywords
                  </h4>
                  <span className="text-neutral-900 leading-8 font-medium">
                    Add the keywords to be notified, like "roofer", "plumber",
                    or "mortgage advisor"
                  </span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-16 text-center h-12 flex items-center justify-center rounded bg-prime text-xl text-white">
                  4
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <h4 className="text-3xl font-timeburner-bold mt-2 text-neutra-900">
                    Get more customers
                  </h4>
                  <span className="text-neutral-900 leading-8 font-medium">
                    People are 78% more likely to ask for a quote when you
                    contact them straight away. No more missing out work!
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Link
            href=""
            className="py-3 w-fit px-3 text-sm rounded bg-prime text-white border-2 border-prime self-center"
          >
            7 Day Free Trial
          </Link>
        </div>
      </section>
      <section className="w-full py-12 md:py-16 px-3">
        <div className="w-full max-w-7xl mx-auto flex flex-col">
          <h3 className="text-4xl md:text-5xl font-timeburner-bold text-center mb-8 md:mb-20 text-prime">
            Don't miss out
          </h3>
          <div className="w-full max-w-6xl gap-20 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <img
                src="/assets/icons/icon1.svg"
                className="w-32 md:w-48"
                alt=""
              />
              <span className="text-3xl font-timeburner-normal text-prime">
                543+
              </span>
              <span className="text-neutral-700 font-medium leading-8">
                Groups are currently being tracked by Murphy.
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <img
                src="/assets/icons/icon2.svg"
                className="w-32 md:w-48"
                alt=""
              />
              <span className="text-3xl font-timeburner-normal text-prime">
                1257+
              </span>
              <span className="text-neutral-700 font-medium leading-8">
                Notifications have been sent by Murhpy to our users.
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <img
                src="/assets/icons/icon3.svg"
                className="w-32 md:w-48"
                alt=""
              />
              <span className="text-3xl font-timeburner-normal text-prime">
                £320,000+
              </span>
              <span className="text-neutral-700 font-medium leading-8">
                Worth of work has been won by our users through Murphy and
                counting.
              </span>
            </div>
          </div>
        </div>
      </section>
      <section id="pricing" className="w-full px-3 py-12 md:py-16">
        <div className="w-full max-w-7xl mx-auto flex flex-col">
          <h3 className="text-4xl md:text-5xl font-timeburner-bold text-center mb-8 md:mb-20 text-prime">
            Pricing
          </h3>
          <div className="w-full max-w-6xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-20 items-center">
            <div className="w-full p-6 border-[4px] border-prime flex flex-col">
              <div className="flex items-center w-full justify-between">
                <h4 className="text-center text-2xl font-timeburner-bold text-prime mb-6">
                  Starter
                </h4>
                <div className="text-center font-timeburner-bold text-lg text-prime mb-6">
                  £14.99<span className="text-base">/month</span>
                </div>
              </div>
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <img src="/assets/icons/check.svg" className="w-5" alt="" />
                  <span className="text-neutral-900 font-medium">2 Groups</span>
                </div>
                <div className="flex items-center gap-3">
                  <img src="/assets/icons/check.svg" className="w-5" alt="" />
                  <span className="text-neutral-900 font-medium">
                    1 Keyword
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <img src="/assets/icons/check.svg" className="w-5" alt="" />
                  <span className="text-neutral-900 font-medium">
                    Unlimited SMS & Email
                  </span>
                </div>
              </div>
              <button className="w-full button rounded text-white bg-prime text-center py-3 cursor pointer transition duration-200 active:scale-95">
                7 Day Free Trial
              </button>
            </div>
            <div className="w-full p-6 border-[4px] border-prime bg-prime flex flex-col">
              <div className="flex items-center w-full justify-between">
                <h4 className="text-center text-2xl font-timeburner-bold text-white mb-6">
                  Pro
                </h4>
                <div className="text-center font-timeburner-bold text-lg text-white mb-6">
                  £19.99<span className="text-base">/month</span>
                </div>
              </div>
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/icons/check_white.svg"
                    className="w-5"
                    alt=""
                  />
                  <span className="text-white font-medium">10 Groups</span>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/icons/check_white.svg"
                    className="w-5"
                    alt=""
                  />
                  <span className="text-white font-medium">10 Keywords</span>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/icons/check_white.svg"
                    className="w-5"
                    alt=""
                  />
                  <span className="text-white font-medium">
                    Unlimited SMS & Email
                  </span>
                </div>
              </div>
              <button className="w-full button rounded text-prime bg-white text-center py-3 cursor pointer transition duration-200 active:scale-95">
                7 Day Free Trial
              </button>
            </div>
            <div className="w-full p-6 border-[4px] border-prime flex flex-col">
              <div className="flex items-center w-full justify-between">
                <h4 className="text-center text-2xl font-timeburner-bold text-prime mb-6">
                  Advanced
                </h4>
                <div className="text-center font-timeburner-bold text-lg text-prime mb-6">
                  £24.99<span className="text-base">/month</span>
                </div>
              </div>
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <img src="/assets/icons/check.svg" className="w-5" alt="" />
                  <span className="text-neutral-900 font-medium">
                    Unlimited Groups
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <img src="/assets/icons/check.svg" className="w-5" alt="" />
                  <span className="text-neutral-900 font-medium">
                    Unlimited Keywords
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <img src="/assets/icons/check.svg" className="w-5" alt="" />
                  <span className="text-neutral-900 font-medium">
                    Unlimited SMS & Email
                  </span>
                </div>
              </div>
              <button className="w-full button rounded text-white bg-prime text-center py-3 cursor pointer transition duration-200 active:scale-95">
                7 Day Free Trial
              </button>
            </div>
          </div>
        </div>
      </section>
      <footer className="w-full bg-prime flex flex-col px-3">
        <div className="w-full py-16 max-w-7xl mx-auto flex md:flex-row flex-col flex-wrap gap-12">
          <div className="flex flex-col gap-4">
            <a href="/">
              <img
                src="/assets/images/murphy_white.png"
                className="w-32"
                alt="Logo"
              />
            </a>
            <div className="flex items-center gap-5 text-neutral-300 text-2xl">
              <Link href="" target="_blank">
                <i className="bx bxl-facebook"></i>
              </Link>
              <Link href="" target="_blank">
                <i className="bx bxl-instagram"></i>
              </Link>
              <Link href="" target="_blank">
                <i className="bx bxl-twitter"></i>
              </Link>
              <Link href="" target="_blank">
                <i className="bx bxl-github"></i>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-timeburner-bold text-white">
              Contact Us
            </h3>
            <a href="mailto:hello@meetmurphy.io" className="text-neutral-300">
              hello@meetmurphy.io
            </a>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-timeburner-bold text-white">Address</h3>
            <span className="text-neutral-300 leading-8">
              45 Fitzroy Street
              <br />
              Fitzrovia, London
              <br />
              W1T 6EB
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-timeburner-bold text-white">
              Uses Cases
            </h3>
            <div className="grid grid-cols-3 sm:items-start items-center md:grid-cols-4 md:gap-y-0 gap-y-4 gap-x-6">
              <span className="text-neutral-300 leading-8">Builders</span>
              <span className="text-neutral-300 leading-8">Plumbers</span>
              <span className="text-neutral-300 leading-8">Electricians</span>
              <span className="text-neutral-300 leading-8">Damps Proofers</span>
              <span className="text-neutral-300 leading-8">
                Beauty Therapists
              </span>
              <span className="text-neutral-300 leading-8">Joiners</span>
              <span className="text-neutral-300 leading-8">Gas Engineers</span>
              <span className="text-neutral-300 leading-8">Mechanics</span>
              <span className="text-neutral-300 leading-8">
                Mortgage Advisors
              </span>
              <span className="text-neutral-300 leading-8">Roofers</span>
              <span className="text-neutral-300 leading-8">Gardeners</span>
              <span className="text-neutral-300 leading-8">Cleaners</span>
            </div>
          </div>
        </div>
        <div className="w-full max-w-6xl mx-auto py-6 border-t border-white/30 flex items-center justify-between gap-5">
          <span className="text-neutral-300 sm:text-base text-sm font-timeburner-normal">
            © All Rights Reversed. Murphy
          </span>

          <ul className="flex items-center gap-5">
            <li>
              <Link
                href=""
                className="text-neutral-300 sm:text-base text-sm font-timeburner-normal"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href=""
                className="text-neutral-300 sm:text-base text-sm font-timeburner-normal"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </main>
  );
}
