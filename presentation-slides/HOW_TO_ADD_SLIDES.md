# How to Add the Remaining Slides

## Step-by-Step Instructions

1. Open the file: `src/pages/index.astro`

2. Scroll to the bottom - you'll see:
```astro
	</section>

</PresentationLayout>
```

3. Add ALL the new slides BEFORE the `</PresentationLayout>` tag

4. After adding slides, run: `npm run build`

5. Open `dist/index.html` to view!

---

## Example Slide Templates

### Full-Width Image Slide (like LunARC - Slide 4)

```astro
<section class="slide relative min-h-screen flex items-center overflow-hidden bg-black">
	<div class="absolute inset-0 z-0">
		<img src="/pictures/Earth from Space.jpg" alt="Earth from space" class="w-full h-full object-cover opacity-60" />
	</div>
	<div class="relative z-10 max-w-5xl mx-auto px-6 py-20 w-full text-center">
		<h2 class="text-4xl md:text-6xl font-[Cabin] font-bold text-white mb-8 leading-tight drop-shadow-lg">
			Your Title Here
		</h2>
		<div class="max-w-3xl mx-auto bg-[#453c36] bg-opacity-80 rounded-[12px] p-8">
			<p class="text-xl text-white leading-relaxed">
				Your content here...
			</p>
		</div>
	</div>
</section>
```

### Gradient Background Slide (like Overview Effect - Slide 5)

```astro
<section class="slide py-20 md:py-32 bg-gradient-to-br from-[#9ed7c7] via-[#f5b611] to-[#d45c26] relative overflow-hidden">
	<div class="absolute inset-0 opacity-10">
		<img src="/illustrations/mandala-1.webp" alt="" class="w-full h-full object-cover" />
	</div>
	<div class="absolute inset-0 bg-black opacity-20"></div>
	<div class="max-w-4xl mx-auto px-6 relative z-10 text-center">
		<h2 class="text-4xl font-[Cabin] font-bold text-white mb-8 drop-shadow-lg">
			Your Title
		</h2>
		<p class="text-xl text-white leading-relaxed drop-shadow-lg">
			Your content...
		</p>
	</div>
</section>
```

### Two-Column with Image (like Slide 3, 8, 12, 14)

```astro
<section class="slide py-20 md:py-32 bg-white">
	<div class="max-w-7xl mx-auto px-6">
		<div class="grid lg:grid-cols-2 gap-12 items-center">
			<!-- Left: Image -->
			<div class="relative">
				<div class="rounded-[12px] overflow-hidden border-4 border-[#f5b611]">
					<img src="/pictures/your-image.jpg" alt="" class="w-full h-full object-cover aspect-[4/3]" />
				</div>
			</div>
			<!-- Right: Content -->
			<div>
				<div class="text-xs font-[Cabin] font-bold tracking-[0.21em] text-[#d45c26] uppercase mb-4">
					Section Label
				</div>
				<h2 class="text-4xl md:text-5xl font-[Cabin] font-bold text-[#453c36] mb-6 leading-tight">
					Slide Title
				</h2>
				<p class="text-lg text-[#453c36] opacity-80 leading-relaxed mb-6">
					Your content paragraph 1...
				</p>
				<p class="text-lg text-[#453c36] opacity-80 leading-relaxed">
					Your content paragraph 2...
				</p>
			</div>
		</div>
	</div>
</section>
```

### Centered Content (like Slide 11)

```astro
<section class="slide py-20 md:py-32 bg-gradient-to-br from-[#9ed7c7] via-[#f5b611] to-[#d45c26] relative overflow-hidden">
	<div class="absolute inset-0 opacity-10">
		<img src="/illustrations/mandala-2.webp" alt="" class="w-full h-full object-cover" />
	</div>
	<div class="absolute inset-0 bg-black opacity-20"></div>
	<div class="max-w-4xl mx-auto px-6 relative z-10 text-center">
		<h2 class="text-5xl font-[Cabin] font-bold text-white mb-8 leading-tight drop-shadow-lg">
			Your Main Title
		</h2>
		<p class="text-2xl text-white leading-relaxed drop-shadow-lg">
			Your subtitle or main point
		</p>
	</div>
</section>
```

### Cards Layout (like Slide 13)

```astro
<section class="slide py-20 md:py-32 bg-[#f9f2e6]">
	<div class="max-w-6xl mx-auto px-6">
		<div class="text-center mb-12">
			<h2 class="text-4xl font-[Cabin] font-bold text-[#453c36] mb-6">
				Slide Title
			</h2>
		</div>
		<div class="grid lg:grid-cols-2 gap-8">
			<!-- Card 1 -->
			<div class="bg-white rounded-[12px] p-8 border-4 border-[#f5b611]">
				<h3 class="text-2xl font-[Cabin] font-bold text-[#453c36] mb-4">Card Title</h3>
				<p class="text-[#453c36] opacity-80">Card content...</p>
			</div>
			<!-- Card 2 -->
			<div class="bg-white rounded-[12px] p-8 border-4 border-[#9ed7c7]">
				<h3 class="text-2xl font-[Cabin] font-bold text-[#453c36] mb-4">Card Title</h3>
				<p class="text-[#453c36] opacity-80">Card content...</p>
			</div>
		</div>
	</div>
</section>
```

---

## Quick Reference: Your Images

### Pictures (Photos)
- `/pictures/Earth from Space.jpg`
- `/pictures/Yab Yum.jpg`
- `/pictures/monks chanting.JPG`
- `/pictures/big offering.JPG`
- `/pictures/EDP students in classroom.jpg`
- `/pictures/SINI Library Shelves.jpg`
- `/pictures/monks in SINI campus.jpg`

### Illustrations
- `/illustrations/monastery-mountain.webp`
- `/illustrations/mountains-sacred-1.webp`
- `/illustrations/mountains-sacred-2.webp`
- `/illustrations/mandala-1.webp` through `/illustrations/mandala-5.webp`
- `/illustrations/monk-reading.webp`
- `/illustrations/meditation-room.webp`

### Icons
- `/icons/SINI orange.webp`
- `/icons/SINI Logo GOLDEN.png`
- `/icons/noun-mandala-6259529.svg`
- `/icons/noun-lotus-6259531.svg`
- `/icons/noun-stupa-7981677.svg`
- `/icons/noun-earth-globe-5717692.svg`
- `/icons/noun-education-1100140.svg`
- `/icons/noun-exhibition-7861909.svg`
- Many more in the icons folder!

---

## Content Mapping

Based on your notes, here's what goes where:

**Slide 3:** Yab Yum photo + explanation of visual dharma transmission
**Slide 4:** Earth photo + LunARC story
**Slide 5:** Gradient + Overview Effect quote
**Slide 6:** Two-column comparing monastic education vs museum resources
**Slide 7:** Yab Yum deeper meaning explanation
**Slide 8:** SINI logo + Sarnath location + heritage work
**Slide 9:** Diversity across 4 schools + connector role
**Slide 10:** EDP classroom photo + student stats
**Slide 11:** Title slide for partnership models
**Slide 12:** Library photo + digital access explanation
**Slide 13:** Fellowship program details (2 cards: what fellows do + benefits)
**Slide 14:** Monks chanting photo + sacred sites integration
**Slide 15:** Swayambhu story + cultural protocols
**Slide 16:** Success metrics in grid layout
**Slide 17:** Dark gradient + urgency message
**Slide 18:** Closing appeal + pilot proposal
**Slide 19:** Final questions + SINI logo

---

## Tips

1. **Copy slide 1 or 2** as a starting template
2. **Change the content** to match your notes
3. **Swap images** to match the slide topic
4. **Adjust colors** using border-[#f5b611], border-[#9ed7c7], or border-[#d45c26]
5. **Test frequently** with `npm run dev` to see changes live

The presentation will look beautiful with the Three Cups aesthetic!
