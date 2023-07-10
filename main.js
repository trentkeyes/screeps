var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {
  // var tower = Game.getObjectById('4bbd46dea9dc677e8ba64954');
  // if (tower) {
  //   var closestDamagedStructure = tower.pos.findClosestByRange(
  //     FIND_STRUCTURES,
  //     {
  //       filter: (structure) => structure.hits < structure.hitsMax,
  //     }
  //   );
  //   if (closestDamagedStructure) {
  //     tower.repair(closestDamagedStructure);
  //   }

  //   var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
  //   if (closestHostile) {
  //     tower.attack(closestHostile);
  //   }
  // }

  const spawn1 = Game.spawns['Spawn1'];

  // see all creeps and role
  // for (name in Game.creeps) {
  //   console.log(Game.creeps[name], ':', Game.creeps[name].memory.role);
  // }
  const creepsCount = Object.keys(Game.creeps).length;

  // make a new creep if the spawn is 250 energy
  if (spawn1.energy >= 250) {
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    const creepName = `Creep${getRandomInt(10000)}`;
    let builders = 0;
    let upgraders = 0;
    for (name in Game.creeps) {
      if ((Game.creeps[name].memory.role = 'harvester')) {
        builders++;
      }
      if ((Game.creeps[name].memory.role = 'upgrader')) {
        upgraders++;
      }
      console.log(`builders: ${builders}, upgraders: ${upgraders}`);
    }
    if (builders >= upgraders) {
      // make upgraders
      spawn1.spawnCreep([WORK, CARRY, MOVE, MOVE], creepName, {
        memory: { role: 'upgrader' },
      });
    } else {
      //make builders
      spawn1.spawnCreep([WORK, CARRY, MOVE, MOVE], creepName, {
        memory: { role: 'builder' },
      });
    }
  }

  // change all creeps roles
  for (name in Game.creeps) {
    Game.creeps[name].memory.role = 'builder';
  }

  // Set a specific creep's role
  Game.creeps['Creep7901'].memory.role = 'upgrader';

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if (creep.memory.role == 'harvester') {
      roleHarvester.run(creep);
    }
    if (creep.memory.role == 'upgrader') {
      roleUpgrader.run(creep);
    }
    if (creep.memory.role == 'builder') {
      roleBuilder.run(creep);
    }
  }

  // var energyAvailable = 0;
  // energyAvailable += Game.spawns.Spawn1.energy;
  // _.filter(Game.structures, function (structure) {
  //   if (structure.structureType == STRUCTURE_EXTENSION) {
  //     energyAvailable += structure.energy;
  //   }
  // });

  // Shows energy available to Spawn1 plus extensions
  //  console.log('Available energy:', energyAvailable);
};
