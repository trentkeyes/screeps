let harvesters = 0;
let upgraders = 0;
for (name in Game.creeps) {
  if ((Game.creeps[name].memory.role = 'harvester')) {
    harvesters++;
  }
  if ((Game.creeps[name].memory.role = 'upgrader')) {
    upgraders++;
  }
  console.log(`harvesters: ${harvesters}, upgraders: ${upgraders}`);
}
if (harvesters >= upgraders) {
  // make upgraders
  spawn1.spawnCreep([WORK, CARRY, MOVE, MOVE], creepName, {
    memory: { role: 'upgrader' },
  });
} else {
  //make harvesters
  spawn1.spawnCreep([WORK, CARRY, MOVE, MOVE], creepName, {
    memory: { role: 'harvester' },
  });
}
