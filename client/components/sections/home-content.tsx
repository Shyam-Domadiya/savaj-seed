"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sprout, Leaf, Package, Users, ArrowRight, Award, ShieldCheck } from "lucide-react"

export function HomeContent({ cropCalendar }: { cropCalendar: React.ReactNode }) {
    return (
        <>
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden animate-in fade-in duration-1000" aria-labelledby="hero-heading">
                {/* Hero Background Image */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <Image
                        src="/images/hero-bg.jpg"
                        alt="Lush green agricultural field at sunrise"
                        fill
                        priority
                        quality={90}
                        className="object-cover scale-105 animate-zoom-in"
                        sizes="100vw"
                    />
                </div>

                <div className="container relative z-20">
                    <div className="mx-auto max-w-4xl text-center space-y-8">
                        <h1 id="hero-heading" className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.1] animate-in fade-in-50 slide-in-from-bottom-8 duration-700 delay-100 drop-shadow-lg">
                            Happiness from the{" "}
                            <span className="text-primary-foreground bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-300">
                                Farmer's Field
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light max-w-2xl mx-auto animate-in fade-in-50 slide-in-from-bottom-8 duration-700 delay-200 drop-shadow-md">
                            Premium quality seeds that transform agriculture. Grow better, harvest more, and cultivate success with Savaj Seeds.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5 justify-center pt-8 animate-in fade-in-50 slide-in-from-bottom-8 duration-700 delay-300">
                            <Button
                                asChild
                                size="lg"
                                className="text-lg h-14 px-10 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-primary hover:bg-primary/90 text-white rounded-full"
                            >
                                <Link href="/products">
                                    View Our Products
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="text-lg h-14 px-10 bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-md hover:scale-105 transition-all duration-300 rounded-full"
                            >
                                <Link href="/contact">Contact Us</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28 lg:py-32 relative overflow-hidden" aria-labelledby="features-heading">
                <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background -z-10" />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

                <div className="container relative">
                    <div className="mx-auto max-w-3xl text-center mb-20 animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
                        <h2 id="features-heading" className="text-4xl md:text-5xl font-bold mb-6 text-balance leading-tight">
                            Why Choose <span className="text-primary">Savaj Seeds</span>?
                        </h2>
                        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-light">
                            We combine traditional agricultural wisdom with modern scientific advancements.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: "High Germination",
                                description: "Every batch is rigorously tested to ensure 98%+ germination rates.",
                                icon: Sprout,
                                gradient: "from-green-500/10 to-emerald-500/10",
                                iconColor: "text-green-600 dark:text-green-400",
                                href: "/about"
                            },
                            {
                                title: "Disease Resistant",
                                description: "Genetically strong varieties that naturally resist common pests.",
                                icon: ShieldCheck,
                                gradient: "from-blue-500/10 to-cyan-500/10",
                                iconColor: "text-blue-600 dark:text-blue-400",
                                href: "/products"
                            },
                            {
                                title: "Higher Yield",
                                description: "Scientifically developed hybrids designed to maximize production.",
                                icon: Award,
                                gradient: "from-amber-500/10 to-orange-500/10",
                                iconColor: "text-amber-600 dark:text-amber-400",
                                href: "/products"
                            },
                            {
                                title: "Expert Support",
                                description: "Access to our team of agricultural experts for guidance.",
                                icon: Users,
                                gradient: "from-purple-500/10 to-pink-500/10",
                                iconColor: "text-purple-600 dark:text-purple-400",
                                href: "/contact"
                            }
                        ].map((feature, index) => (
                            <Link
                                key={index}
                                href={feature.href}
                                className="group block relative bg-white/60 dark:bg-card/40 backdrop-blur-md border border-white/20 dark:border-white/10 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-in fade-in-50 slide-in-from-bottom-8 fill-mode-backwards cursor-pointer"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

                                <div className="relative z-10">
                                    <div className={`inline-flex items-center justify-center h-14 w-14 rounded-xl bg-white dark:bg-white/10 shadow-sm dark:shadow-none mb-6 ${feature.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                                        <feature.icon className="h-7 w-7" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                                        {feature.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {cropCalendar}

            <section className="py-20 md:py-28 lg:py-32 bg-muted/30">
                <div className="container">
                    <div className="mx-auto max-w-3xl text-center mb-16 animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance leading-tight">Our Seed Categories</h2>
                        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-light">
                            Discover our comprehensive range of premium seeds for every farming need.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Vegetable Seeds Card */}
                        <Link href="/products?category=vegetable" className="group relative h-[400px] overflow-hidden rounded-2xl cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 animate-in fade-in-50 slide-in-from-bottom-8 delay-100">
                            <div className="absolute inset-0">
                                <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/30 transition-colors duration-500" />
                                <Image
                                    src="/images/category-vegetable.jpg"
                                    alt="Vegetable Seeds"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>

                            <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-green-600/90 backdrop-blur-sm text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <Sprout className="h-7 w-7" />
                                    </div>
                                    <h3 className="text-3xl font-bold mb-3 text-white">Vegetable Seeds</h3>
                                    <p className="text-white/90 mb-6 font-medium leading-relaxed drop-shadow-md">
                                        Premium vegetable seeds including tomatoes, peppers, cucumbers.
                                    </p>
                                    <span className="inline-flex items-center text-sm font-bold text-white group-hover:translate-x-2 transition-transform duration-300 uppercase tracking-wide">
                                        Explore Collection <ArrowRight className="ml-2 h-4 w-4" />
                                    </span>
                                </div>
                            </div>
                        </Link>

                        {/* Crop Seeds Card */}
                        <Link href="/products?category=crop" className="group relative h-[400px] overflow-hidden rounded-2xl cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 animate-in fade-in-50 slide-in-from-bottom-8 delay-200">
                            <div className="absolute inset-0">
                                <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/30 transition-colors duration-500" />
                                <Image
                                    src="/images/category-crop.jpg"
                                    alt="Crop Seeds"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>

                            <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-600/90 backdrop-blur-sm text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <Leaf className="h-7 w-7" />
                                    </div>
                                    <h3 className="text-3xl font-bold mb-3 text-white">Crop Seeds</h3>
                                    <p className="text-white/90 mb-6 font-medium leading-relaxed drop-shadow-md">
                                        High-yielding seeds for wheat, rice, maize optimized for Indian climate.
                                    </p>
                                    <span className="inline-flex items-center text-sm font-bold text-white group-hover:translate-x-2 transition-transform duration-300 uppercase tracking-wide">
                                        View Crops <ArrowRight className="ml-2 h-4 w-4" />
                                    </span>
                                </div>
                            </div>
                        </Link>

                        {/* Hybrid Seeds Card */}
                        <Link href="/products?category=hybrid" className="group relative h-[400px] overflow-hidden rounded-2xl cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 animate-in fade-in-50 slide-in-from-bottom-8 delay-300">
                            <div className="absolute inset-0">
                                <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/30 transition-colors duration-500" />
                                <Image
                                    src="/images/category-hybrid.jpg"
                                    alt="Hybrid Seeds"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>

                            <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/90 backdrop-blur-sm text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <Package className="h-7 w-7" />
                                    </div>
                                    <h3 className="text-3xl font-bold mb-3 text-white">Hybrid Seeds</h3>
                                    <p className="text-white/90 mb-6 font-medium leading-relaxed drop-shadow-md">
                                        Advanced hybrids offering superior disease resistance and productivity.
                                    </p>
                                    <span className="inline-flex items-center text-sm font-bold text-white group-hover:translate-x-2 transition-transform duration-300 uppercase tracking-wide">
                                        Discover Hybrids <ArrowRight className="ml-2 h-4 w-4" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28 lg:py-32 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground relative overflow-hidden animate-in fade-in duration-700">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />
                <div className="container relative z-10">
                    <div className="mx-auto max-w-3xl text-center space-y-8 animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
                        <h2 className="text-4xl md:text-5xl font-bold text-balance leading-tight">
                            Ready to Transform Your Farm?
                        </h2>
                        <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed font-light">
                            Join thousands of satisfied farmers who have improved their yields with Savaj Seeds.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                            <Button
                                asChild
                                size="lg"
                                variant="secondary"
                                className="text-base h-12 px-8 shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300"
                            >
                                <Link href="/contact">Get in Touch</Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="text-base h-12 px-8 border-primary-foreground/20 hover:bg-primary-foreground/10 bg-transparent text-primary-foreground hover:text-primary-foreground hover:scale-110 transition-all duration-300 hover:shadow-lg"
                            >
                                <Link href="/about">Learn More About Us</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
