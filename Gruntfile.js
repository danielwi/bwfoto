module.exports = function(grunt) {
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		uglify: {
			toMarkup: {
				src: 'assets/scripts/plugins/*.js',
				dest: 'markup/js/plugins-comb.min.js'
			},
			minfy: {
				files: [
					{
						expand: true,
						cwd: 'assets/scripts/',
						src: ['**/*.js','!**/plugins/*.js','!**/*.min.js'],
						dest: 'markup/js/min/',
						ext: '.min.js'
					}
				]
			}
		},
		jshint: {
			files: {
				src: ['assets/scripts/**/*.js', '!assets/scripts/**/plugins/*.js', '!assets/scripts/**/modernizr*.js']
			}
		},
		copy: {
			toMarkup: {
				files: [
					{
						expand: true,
						cwd: 'assets/fonts/',
						src: ['*.*'],
						dest: 'markup/css/fonts/'
					}
				]
			}
		},
		less: {
			toMarkup: {
				options: {
					compress: true
				},
				files: [
					{
						expand: true,
						cwd: 'assets/less/',
						src: ['**/*.less','!**/_*.less'],
						dest: 'markup/css/',
						ext: '.min.css'
					}
				]
			}
		},
		concat: {
			toMarkup: {
				src: 'assets/scripts/plugins/*.js',
				dest: 'markup/js/plugins-comb.js'
			},
			toMarkupFunctions: {
				src: 'assets/scripts/functions/*.js',
				dest: 'markup/js/app.js'

			}
		},
		imagemin: {
			toMarkup: {
				options: {
					optimizationLevel: 3
				},
				files: [
					{
						expand: true,
						cwd: 'assets/images/',
						src: ['**/*.{png,jpg,jpeg,gif}'],
						dest: 'markup/img/'
					}
				,
				]
			}
		},
		connect: {
			server: {
				options: {
					port: 8080,
					hostname: '*',
					base: 'markup',
					open: 'http://dwiklund.local:8080',
					livereload: true
				}
			}
		},
		watch: {
			less: {
				files: ['assets/less/**/*.less'],
				tasks: ['less:toMarkup'],
				options: {
					livereload: true
				}
			},
			jsHint: {
				files: ['assets/scripts/**/*.js', '!assets/scripts/**/*.min.js', '!assets/scripts/**/plugins/*.js'],
				tasks: ['jshint']
			},
			jsConcat: {
				files: ['assets/scripts/**/*.js'],
				tasks: ['concat','uglify:minfy']
			},
			imgOptimize: {
				files: ['assets/images/**/*.png','images/**/*.jpg','images/**/*.jpeg'],
				tasks: ['imagemin:toMarkup']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-imagemin');

	grunt.registerTask('default', ['connect','watch']);
	grunt.registerTask('startup', ['rename:renameFolders','clean:dummyfiles']);
	grunt.registerTask('dev', ['uglify','less']);
};