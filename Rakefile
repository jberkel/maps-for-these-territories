#!/usr/bin/env

DISTRICTS = %w(Kreuzberg Mitte Prenzlauer_Berg Friedrichshain Neukölln Moabit Tiergarten Tempelhof Schöneberg)

task :default => [ :geo, :changes ]

task :geo do
  sh("./merge_geo.js " + DISTRICTS.map { |d| File.join('data', d, 'json') }.join(' '))
  File.open('render/js/data/streets.js', 'w') do |f|
		f << 'var streets = '
  	f << IO.read('merged_geo.json')
  	f << ';'
  end
end

task :changes do
	sh("./merge_changes.js " + DISTRICTS.map { |d| File.join('data', d, 'csv', "#{d}.csv") }.join(' '))
	  File.open('render/js/data/changes.js', 'w') do |f|
		f << 'var changes = '
  	f << IO.read('merged_changes.json')
  	f << ';'
  end
end

