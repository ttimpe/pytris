module.exports = function(grunt) {
grunt.initConfig({
  uglify: {
      options : {
        sourceMap : true,
        sourceMapName : 'sourceMap.map',
        mangle:true
      },
      build: {
							 src: ['src/version.js', 'lang/en.js', 'src/Translation.js', 'src/GameState.js', 'src/Operands.js', 'src/Helpers.js', 'src/Options.js', 'src/Main.js', 'src/Menu.js', 'src/Block.js', 'src/BlockActions.js', 'src/Drawing.js', 'src/InputHandlers/*.js','src/InputEvents.js', 'src/Music.js', 'src/HighscoreEntry.js'],
		 					 dest: 'pytris.min.js'
    	}
	}		
});
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.registerTask('default', ['uglify']);
};
