import React from 'react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Radio } from '../components/ui/Radio'
import { Counter } from '../components/ui/Counter'

const StyleGuide = () => {
  return (
    <div className="min-h-screen bg-grayLighter p-10 font-manrope text-background">
      {/* Title */}
      <h1 className="text-h1 mb-8">🎨 Project Style Guide</h1>

      {/* Color Palette */}
      <section className="mb-16">
        <h2 className="text-h3 mb-4">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[{
            name: 'Primary', hex: '#D87D4A'
          }, {
            name: 'Accent', hex: '#FBAF85'
          }, {
            name: 'Background', hex: '#101010'
          }, {
            name: 'Gray Light', hex: '#F1F1F1'
          }, {
            name: 'Gray Lighter', hex: '#FAFAFA'
          }, {
            name: 'White', hex: '#FFFFFF'
          }, {
            name: 'Black', hex: '#000000'
          }, {
            name: 'Error', hex: '#CD2C2C'
          }, {
            name: 'Border', hex: '#CFCFCF'
          }].map(color => (
            <div key={color.name} className="rounded-2xl shadow p-4 bg-white">
              <div className="h-16 w-full rounded-xl mb-3" style={{ backgroundColor: color.hex }} />
              <p className="font-bold">{color.name}</p>
              <p className="text-sm text-gray-500">{color.hex}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className="mb-16">
        <h2 className="text-h3 mb-4 text-black">Typography</h2>
        <div className="space-y-4 text-black">
          <h1 className="text-h1">Heading 1 - Manrope Bold 56px</h1>
          <h2 className="text-h2">Heading 2 - Manrope Bold 40px</h2>
          <h3 className="text-h3">Heading 3 - Manrope Bold 32px</h3>
          <h4 className="text-h4">Heading 4 - Manrope Bold 28px</h4>
          <h5 className="text-h5">Heading 5 - Manrope Bold 24px</h5>
          <h6 className="text-h6">Heading 6 - Manrope Bold 18px</h6>
          <p className="text-subtitle uppercase">Subtitle - Bold 13px</p>
          <p className="text-overline uppercase tracking-[10px]">Overline - Regular 14px</p>
          <p className="text-body">Body Text - Medium 15px</p>
        </div>
      </section>

      {/* Buttons */}
      <section className="mb-16">
        <h2 className="text-h3 mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-6">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
        </div>
      </section>

      {/* Input Fields */}
      <section className="mb-16">
        <h2 className="text-h3 mb-4">Input Fields</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Input label="Default" placeholder="Placeholder" />
          <Input state="active" label="Active / Focus" placeholder="Placeholder" />
          <Input state="error" label="Error" placeholder="Error State" error="This field is required" />
        </div>
      </section>

      {/* Radio Buttons */}
      <section className="mb-16">
        <h2 className="text-h3 mb-4 text-black">Radio Buttons</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Radio name="option" label="Default" />
          <Radio name="option" label="Active" checked={true} />
          <Radio name="option" label="Hover" state="hover" />
        </div>
      </section>

      {/* Counter */}
      <section>
        <h2 className="text-h3 mb-4 text-black">Counter</h2>
        <Counter />
      </section>
    </div>
  )
}

export default StyleGuide