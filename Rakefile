require 'rake/testtask'

Rake::TestTask.new do |t|
  t.test_files = FileList['tests/*test.rb']
  t.warning = false
end

task default: :test
